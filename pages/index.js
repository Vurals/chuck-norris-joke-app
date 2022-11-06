import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image'
import ChuckNorrisContentArt from '../public/chuck-norris-digital-art.jpg'
import { useRouter } from 'next/router'


const Login = (props) => {
    const router = useRouter();
    const onFinish = (values) => {
        console.log('Success:', values);
        router.push('/home', undefined, { shallow: true });
        // const { username, password } = values;
        // props.login(username, password);
    };

    const onFinishFailed = (errorInfo) => {
        alert('Failed:', errorInfo);
    };

    return ( <>
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 100,
            }}
        >
            <Image 
                src={ChuckNorrisContentArt} 
                alt="Chuck" 
            />
        </div>
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
                marginTop: 50,
                marginRight: 300,
            }}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>
            </Form.Item>
        </Form>
        </>
    );
}


export default Login;