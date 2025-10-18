import type { Types } from "mongoose";
import { LinkModel } from "../collections/linkCollection.js";

import crypto from "crypto";
import { ContentModel } from "../collections/contentsCollection.js";

const hashLink = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const createShareLinkFunc = async (userId: Types.ObjectId) => {

    const hash = hashLink();
    const res = await LinkModel.create({
        hash,
        userId
    });
    if (res) return `http://localhost:4001/app/v1/user/shared-user/${hash}`; // just need to return hash and have to mangae the remain url in frontend
    return 'Null';
}


export const deleteShareLinkFunc = async (userId: Types.ObjectId) => {

    await LinkModel.deleteOne({
        userId
    });
}

export const dataByShareLinkFunc = async (hash: string) => {

    const res = await LinkModel.findOne({
        hash
    });
    console.log(res);
    console.log(hash);
    if (res) {
        const userId = res.userId;
        const data = await ContentModel.find({
            userId
        });
        if (data) return data;
        else return 'user not exists';  // if the use may be delete the account so contnetModel will null therefore returning this
    } else {
        return 'NOT FOUND';
    }
}