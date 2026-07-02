from pypdf import PdfReader

async def load_document(resume):
  try:
    reader = PdfReader(resume.file)
    extracted_text = ""
    for page in reader.pages:
      extracted_text += page.extract_text()
    return extracted_text
  except:
    return "Some error occured while loading the document"

