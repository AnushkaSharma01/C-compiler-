const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/execute-csharp', (req, res) => {
    const { code, userInput } = req.body;

    // Split userInput into an array of inputs, trimming spaces
    const inputs = userInput.split('\n').map(input => input.trim());

    // Define the Program.cs content with user-provided code and inputs
    const programCode = `
        using System;

        class Program
        {
            public static void Main(string[] args)
            {
                string[] inputs = new string[] { ${inputs.map(input => `"${input}"`).join(',')} };
                int index = 0;
                ${code.replace(/Console\.ReadLine\(\)/g, 'inputs[index++]')}
            }
        }
    `;

    // Write the code to a file
    const codeFilePath = path.join(__dirname, 'Program.cs');
    fs.writeFileSync(codeFilePath, programCode);

    // Compile and execute the C# code
    const compileCommand = `csc ${codeFilePath} -out:${path.join(__dirname, 'Program.exe')}`;
    exec(compileCommand, (compileError, stdout, stderr) => {
        if (compileError) {
            res.status(500).json({ error: stderr });
            return;
        }

        // Execute the compiled program
        const executeCommand = `mono ${path.join(__dirname, 'Program.exe')}`;
        exec(executeCommand, (executeError, stdout, stderr) => {
            if (executeError) {
                res.status(500).json({ error: stderr });
                return;
            }

            res.json({ output: stdout });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});









