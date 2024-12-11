"use client";

import React from "react";
import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="1694668094438130" chatSupport>
            <CustomChat pageId="2142061542783366" minimized={true} />
        </FacebookProvider>
    );
};

export default FacebookMsg;
