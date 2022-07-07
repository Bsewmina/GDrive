const fs = require("fs");
const { google } = require("googleapis");

//load keyfile from a local file
const KeyFile = "./my-project-infini-testing-e3e334567769.json";
//define the scope that the user can access
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Create an Auth client
const auth = new google.auth.GoogleAuth({
  keyFile: KeyFile,
  scopes: SCOPES,
});

//define the version
const drive = google.drive({ version: "v3", auth });

async function uploadFile() {
  var fileMetadata = {
    name: "photo.jpg",
    // Folder id
    parents: ["1wfehjduJAmq7SDodm90xTOVZRR1s_muH"],
  };

  // Media definition of the file
  var media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("./Aphoto.jpg"),
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File uploaded File Id: ", file.data.id);
      }
    }
  );
}

uploadFile();
