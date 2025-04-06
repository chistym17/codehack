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
    python: { id: 71, extension: '.py' },
    cpp: { id: 54, extension: '.cpp' },
    c: { id: 50, extension: '.c' },
};

async function submitTestCase(fullCode, language, input, output, testCaseNumber) {
    const languageInfo = languageMap[language.toLowerCase()];
    if (!languageInfo) {
        throw new Error('Unsupported language');
    }

    console.log(`[Submit] Submitting test case ${testCaseNumber} for language ${language}`);

    const submissionRes = await axios.post(
        `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true`,
        {
            source_code: fullCode,
            language_id: languageInfo.id,
            stdin: input,
            expected_output: output
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': process.env.RAPIDAPI_HOST
            }
        }
    );

    const result = submissionRes.data;
    const passed = result.status.id === 3 && result.stdout.trim() === output.trim();

    return {
        testCaseNumber,
        input,
        expected_output: output,
        actual_output: result.stdout,
        passed,
        status: passed ? 'Passed' : 'Failed',
        error: result.stderr || result.compile_output || null
    };
}

app.post('/submit', async (req, res) => {
    const { fullCode, language, problem } = req.body;

    if (!fullCode || !language || !problem) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const results = [];
        let failedTestCase = null;

        for (let i = 0; i < problem.test_cases.length; i++) {
            const testCase = problem.test_cases[i];
            const result = await submitTestCase(
                fullCode,
                language,
                testCase.input,
                testCase.output,
                i + 1
            );

            results.push(result);
            if (!result.passed && failedTestCase === null) {
                failedTestCase = i + 1;
            }
        }

        const summary = {
            totalTests: results.length,
            passed: results.filter(r => r.passed).length,
            failed: results.filter(r => !r.passed).length,
            firstFailedTest: failedTestCase
        };

        return res.status(200).json({
            message: 'All test cases processed.',
            summary,
            results
        });

    } catch (error) {
        console.error('Error during submission:', error.message);
        return res.status(500).json({ error: 'Failed to submit code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
