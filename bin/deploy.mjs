import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();
exec(`npx ovsx publish -p ${process.env.OPENVSX_TOKEN}`, handleCommand);
exec("npx vsce publish", handleCommand);

function handleCommand(error, stdout) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(stdout);
}
