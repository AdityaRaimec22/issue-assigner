import bodyParser from "body-parser";
import issue_comment_created from "./handlers/issue_comment_created.js";
import issue_opened from "./handlers/issue_opened.js";

export default async (app, { getRouter }) => {
  const router = getRouter("/issue-assigner");
  router.use(bodyParser.json());
  router.get("/", async (req, res) => {
    res.status(200).send("Welcome to Issue Assigner");
  });

  router.post("/webhook", (req, res) => {
    console.log("Webhook from marketplace: ", req.body);
    res.status(200).json({ success: "Webhook received successfully" });
  });

  // Issue opened by a user
  app.on("issues.opened", issue_opened);

  // Comment is created in an issue by a user
  app.on(
    ["issue_comment.created", "issue_comment.edited"],
    issue_comment_created
  );
};
