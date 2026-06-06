import fs from "fs";
import * as pdfjsdist from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import { parse } from "path";
export const analyseResume = async (req, res) => {
  console.log("User: ", req.user);
  if (!req.file) {
    return res.status(401).json({
      success: false,
      message: "Resume is required",
    });
  }
  try {
    // gives file path
    const filePath = req.file.path;

    // gives binary code of file
    const fileBuffer = await fs.promises.readFile(filePath);

    // convert to unit8array form
    const unit8array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: unit8array }).promise;

    let resumeText = "";
    for (let numPage = 1; numPage <= pdf.numPages; numPage++) {
      const page = await pdf.getPage(numPage);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `Extract structured data from resume
        Return strictly JSON :
        {
        "role":string,
        "experience":string,
        "projects":["project1","project2"],
        "skills":['skill1','skill2']
        }
        `,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];
    const AiResponse = await askAi(messages);
    console.log("responseAI: ", AiResponse);
    const parsed = JSON.parse(AiResponse);
    console.log("responsePar: ", parsed);
    return res.status(200).json({
      success: true,
      user: {
        role: parsed.role,
        experience: parsed.experience,
        projects: parsed.projects,
        skills: parsed.skills,
      },
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Server Error",
      error: error.name,
    });
  }
};
