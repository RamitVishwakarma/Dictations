require("dotenv").config();
const {
  PollyClient,
  SynthesizeSpeechCommand,
} = require("@aws-sdk/client-polly");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const z = require("zod");

//? Creating a new PollyClient
const pollyClient = new PollyClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    //? Getting the delay between words from the request body
    if (!req.body.text) return res.status(400).send("Text is required");
    if (!req.body.delay) return res.status(400).send("Delay is required");
    const schema = z.object({
      text: z.string(),
      delay: z.number(),
    });
    // console.log(schema.safeParse(req.body).success);
    if (!schema.safeParse(req.body).success) {
      return res.status(400).send("Invalid request body");
    } else {
      const delayBetweenWords = req.body.delay;
      //? Splitting the text into words and then adding a time delay between words using SSML
      if (delayBetweenWords < 0)
        return res.status(400).send("Delay should be greater than 0");
      const text = req.body.text
        .split(" ")
        .join(`<break time="${delayBetweenWords}ms"/>"`);
      const pollyText = `<speak>${text}</speak>`;
      //? the input object for the SynthesizeSpeechCommand
      const input = {
        OutputFormat: "mp3",
        Text: pollyText,
        VoiceId: "Joey",
        Engine: "neural",
        LanguageCode: "en-US",
        TextType: "ssml",
      };
      //? Sending the command to the PollyClient
      const command = new SynthesizeSpeechCommand(input);
      //? Getting the response from the PollyClient
      const response = await pollyClient.send(command);
      //? Sending the audio stream as a response
      res.setHeader("Content-Type", response.ContentType);
      response.AudioStream.pipe(res);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
