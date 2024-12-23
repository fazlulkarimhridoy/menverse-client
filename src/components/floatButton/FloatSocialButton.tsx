import React from "react";
import {
    FacebookOutlined,
    MessageFilled,
    WhatsAppOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
const FloatSocialButton = () => {
    return (
        <div className="print:hidden">
            <FloatButton.Group
                type="primary"
                trigger="click"
                style={{ right: 30, bottom: 30 }}
                icon={<MessageFilled />}
            >
                <FloatButton
                    href="https://wa.me/+8801328369000"
                    icon={<WhatsAppOutlined />}
                />
                <FloatButton
                    href="https://m.me/2142061542783366"
                    icon={<FacebookOutlined />}
                />
            </FloatButton.Group>
        </div>
    );
};

export default FloatSocialButton;
