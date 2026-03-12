




import express from "express";
import { userShareController } from "../../../controllers/share/userShareController";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export const shareUser = express();


shareUser.get('/public/:share_hash', userShareController.publicDashboard);


shareUser.get('/get-user-share', authMiddleware, userShareController.getUserShareLink); // GET: Check if share link exists and return shareHash

shareUser.patch('/update-user-share', authMiddleware, userShareController.createORdeleteUserShareLink); // POST: Create or delete share link on the basis of existence in db