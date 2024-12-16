import React from "react";
import { FacebookOutlined, MessageFilled, MessageOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
const FloatSocialButton = () => {
    return (
        <div>
            <FloatButton.Group
            type="primary"
                htmlType="button"
                trigger="click"
                style={{ right: 20, bottom: 20 }}
                icon={<MessageFilled />}
            >
                <FloatButton href="https://wa.me/+8801328369000" icon={<WhatsAppOutlined />} />
                <FloatButton href="https://m.me/2142061542783366" icon={<FacebookOutlined />} />
            </FloatButton.Group>
        </div>
    );
};

export default FloatSocialButton;
