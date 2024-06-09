let welcomeMessage =(name)=>{ 
    let msg = ` <h2>Welcome to Media Sharing App, ${name} !</h2>
    <p>Dear ${name},</p>
    <p>We're thrilled to introduce you to Media Sharing App as a part of minly assessment for software engineering role - your go-to platform for effortlessly managing and sharing your media content.</p>
    <p>With Media Sharing App, you can easily upload, organize, and showcase your photos and videos with just a few clicks.</p>
    <p>Ready to get started? Simply start sharing your stories today!</p>
    <p>Thank you for joining Media Sharing App community!</p>
    <p>Best regards,<br> Minly Team</p>`
    return msg;
};

module.exports = welcomeMessage;