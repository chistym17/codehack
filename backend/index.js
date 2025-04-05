const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const languageMap = {
    python: 71,
    cpp: 54,
    c: 50,
};

app.post('/submit', async (req, res) => {
    const { fullCode, language, problem } = req.body;

    if (!fullCode || !language || !problem) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const languageId = languageMap[language.toLowerCase()];
    if (!languageId) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    try {
        const results = [];

        for (const testCase of problem.test_cases) {
            const submissionRes = await axios.post(
                `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`,
                {
                    source_code: fullCode,
                    language_id: languageId,
                    stdin: testCase.input,
                    expected_output: testCase.output,
                }
            );

            const token = submissionRes.data.token;

            const resultRes = await axios.get(
                `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`
            );

            const resultData = resultRes.data;
            results.push({
                input: testCase.input,
                expected_output: testCase.output,
                actual_output: resultData.stdout?.trim() || '',
                passed: resultData.stdout?.trim() === testCase.output.trim(),
                status: resultData.status?.description,
            });
        }

        return res.status(200).json({ results });
    } catch (error) {
        console.error('Judge0 error:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Code execution failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
