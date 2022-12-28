import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const prompt = `
Write me a step by step recipe containing the following input : 

input: ${req.body.userInput}

If there is something in the input that is not a cooking ingredient you should respond with :
"I don't recognise one of your ingredients, sorry !" and nothing else.

Else, i want an output in json that should contain : 
- a "name" attribute with the name of the receipe
- an "ingredients" attribute that is a list, with all the ingredients needed for the recipe
- an "instructions" attribute that is a list, with all steps
- a "time" attribute with the approximative time in minute to make the receipe
- a "numberOfPeople" attribute representing the number of people of the receipe
`;

  // Run first prompt
  console.log(`API: ${prompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}`,
    temperature: 0.7,
    max_tokens: 1500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
