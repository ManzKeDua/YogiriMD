const axios = require('axios');


let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args,
    isOwner
}) => {
    if (args[0] && args[0].toLowerCase() === 'getmodels') {
        const models = await getModels();
        let text = '';
        for (const key in models) {
            text += `${key}: ${models[key]}\n`;
        }
        return await conn.sendMessage(m.chat, {
            text: text
        }, {
            quoted: m
        });
    } else if (args[0] && args[0].toLowerCase() === 'setmodels') {
        if (args.length <= 1) return m.reply('Masukkan model yang ingin digunakan\nKetik .stablediff setmodels <models>\n\ncontohnya stablediff setmodels juggernaut_aftermath.safetensors [5e20c455]');
        const modelsProdia = {};
        modelsProdia[0] = args.slice(1).join(" ");
        global.db.data.users[m.sender].modelsProdia = modelsProdia;
        return await conn.reply(m.chat, `Berhasil menyimpan model!`, m);
    }
    try {
        let out = global.db.data.users[m.sender].modelsProdia || null;
        let tema = '';
        if (out) {
            tema = Object.values(out)[0];
        }
        if (!tema) {
            return m.reply(`Kamu belum menyimpan model apa-apa.\n*Set Models:*\n${usedPrefix}stablediff setmodels [model]\nKetik: ${usedPrefix}stablediff getmodels untuk melihat model`);
        }
        if (args.length < 1) {
            return m.reply('Masukkan prompt untuk dihasilkan');
        }
        await m.reply(wait)
        const params = {
            prompt: encodeURIComponent(args[0]),
            negative_prompt: '',
            model: tema
        };
        const openAIResponse = await generate(params);

        if (openAIResponse) {
            const tag = `@${m.sender.split('@')[0]}`;
            await conn.sendMessage(m.chat, {
                image: openAIResponse[0].buffer,
                caption: `Nih effect model \`${tema}\` nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply('error')
        console.log(e)
    }
}

handler.help = ["stablediff *[prompt]*", "stablediff getmodels", "stablediff setmodels [model]"]
handler.tags = ["ai"]
handler.command = /^(stablediff)$/i

module.exports = handler

const defaultParams = {
    "model": "auto",
    "steps": 30,
    "cfg": 7.5,
    "sampler": "Euler a",
    "negative_prompt": "(bad_prompt:0.8), multiple persons, multiple views, extra hands, ugly, lowres, bad quality, blurry, disfigured, extra limbs, missing limbs, deep fried, cheap art, missing fingers, out of frame, cropped, bad art, face hidden, text, speech bubble, stretched, bad hands, error, extra digit, fewer digits, worst quality, low quality, normal quality, mutated, mutation, deformed, severed, dismembered, corpse, pubic, poorly drawn, (((deformed hands))), (((more than two hands))), (((deformed body))), ((((mutant))))', ",
    "quantity": 1
};

const app_base = `https://app.prodia.com`;
const api_base = `http://api.prodia.com`;
const cloud_base = `https://images.prodia.xyz`;
const host_base = `api.prodia.com`;

const wait = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};

const sliceQuotes = (str) => {
    if (str.charAt(0) === "'" && str.charAt(str.length - 1) === "'") {
        return str.slice(1, -1);
    }
    return str;
};

const generateReq = async ({
    prompt,
    model,
    negative_prompt = defaultParams.negative_prompt,
    steps = defaultParams.steps,
    cfg = defaultParams.cfg,
    seed = (Math.floor(Math.random() * 1000000)),
    sampler = defaultParams.sampler
} = {}) => {
    const params = {
        prompt: prompt,
        model: model,
        negative_prompt: negative_prompt,
        steps: steps,
        cfg: cfg,
        seed: seed,
        sampler: sampler,
        aspect_ratio: "square"
    };
    let request = await axios.get(`${api_base}/generate`, {
            params: params,
            headers: {
                Referer: `${app_base}`,
                Host: `${host_base}`
            },
            timeout: 300000
        },
        params);
    return request.data;
};

const jobReq = async (job) => {
    return (await axios.get(`${api_base}/job/${job}`)).data;
};

const imageReq = async (job) => {
    return await axios.get(`${cloud_base}/${job}.png?download=1`, {
        responseType: 'arraybuffer'
    });
};

const req = {
    generate: generateReq,
    job: jobReq,
    image: imageReq
};

const getModels = async (select) => {
    const response = await axios.get(`${app_base}`);
    const regex = /<script defer="defer" src="(\/js\/app\.[a-f\d]+\.js)"><\/script>/;
    const match = response.data.match(regex);
    const jsPath = match[1];
    const jsResponse = await axios.get(`${app_base}${jsPath}`);
    const modelsMatch = jsResponse.data.match(/VUE_APP_AI_MODELS:'(.*?)',VUE_APP_STATS_STREAMS/);
    const modelsString = modelsMatch[1].replaceAll("\\", "");
    const models = JSON.parse(modelsString);
    return models;
};

const draw = async (options) => {
    const {
        modelIds,
        model,
        quantity = 1,
        comp
    } = options;
    if (!model || model == 'auto') {
        options.model = modelIds.find(modelId => modelId.startsWith('anything-v4.5'));
    }
    const images = [];
    const length = comp ? quantity * modelIds.length : quantity;

    const promises = Array.from({
        length: length
    }, async (_, i) => {
        comp ? options.model = modelIds[i % modelIds.length] : comp;
        //Если comp = true то перебираются все модели
        const jobInfo = await req.generate(options);
        const {
            job
        } = jobInfo;
        var statusCheck = 20;
        //Таймаут 
        var status;
        do {
            await wait(3000);
            //Ожидание 3 секунд перед повторной проверкой статуса 
            const statusInfo = await req.job(job);
            ({
                status
            } = statusInfo);
            statusCheck--;
        } while (status !== "succeeded" && statusCheck > 0)
        if (status !== "succeeded") {
            return "Status check timeout";
        }
        const imageData = await req.image(job);
        const {
            data
        } = imageData;
        var image = {};
        image.buffer = Buffer.from(data, 'binary');
        image = {
            ...image,
            ...jobInfo
        };
        image.params.model = image.params.options.sd_model_checkpoint;
        delete image.params.options.sd_model_checkpoint;
        delete image.status;
        images.push(image);
    });

    await Promise.all(promises);
    return images;
};

const generate = async (params, models = '') => {
    !models ? models = await getModels() : models;
    const modelIds = Object.values(models);
    return await draw({
        modelIds,
        ...params
    });
};