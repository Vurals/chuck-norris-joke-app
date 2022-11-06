import { CopyrightOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button,Col, Row } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import MenuComp from '../components/MenuComp';
import Image from 'next/image'
import ChuckNorris from '../public/ChuckNorris1.jpg'
import ChuckNorrisContentArt from '../public/chuck-norris-digital-art.jpg'
import axios from 'axios';
import { useState, useEffect } from 'react';

const { Header, Content, Footer, Sider } = Layout;


const Home = ({categories, error, props}) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  const [value, setValue] = useState("Time waits for no man. Unless that man is Chuck Norris.");
  const [jokeCategory, setCategory] = useState("");
  const [imgUrl, setImageUrl] = useState(ChuckNorrisContentArt);

  useEffect(() => {
      getRandomJoke(jokeCategory);
  }, [jokeCategory])

  const  getRandomJoke = (jokeCategory) => {
    //at the begining showing the default joke since the category has not been choosen
    //to avoid api error check for jokeCategory is empty or not
    if(jokeCategory === ""){
        return;
    }
    else{
        try{
            axios.get('https://api.chucknorris.io/jokes/random?category=' + jokeCategory)
            .then((res) => {
               setValue(res.data.value,);
               console.log(value);
            })
        }catch (err) {
            console.log(err);
        }
    }
  }
  return (
    <Layout hasSider>
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div className="logo">
                <Image src={ChuckNorris} width={200} height={75} alt="Chuck" />
            </div> 
            <MenuComp key={'MenuC1'} categories={categories} setCategory={setCategory}> </MenuComp> 
        </Sider>
        <Layout
            className="site-layout"
            style={{
                marginLeft: 200,
            }}
        >
            <Header
                className="site-layout-background"
                style={{
                    height: 75,
                    textAlign: 'center',
                    fontSize: 30,
                }}
            >
                <h1 style={{color: 'white'}}>Pick a category to get a random joke</h1>
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 790,
                    textAlign: 'center',
                }}
            >
                <Row>
                    <Col span={12} offset={6}>
                        <Button type="primary" style={{marginBottom:15}} onClick={() => getRandomJoke(jokeCategory)}>Next Random Joke on the Category</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <Image src={ChuckNorrisContentArt}  alt="ChuckContent" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <div>
                            <h1 style={{margin: 20}}>{value}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <div>
                            <h1 style={{margin: 20}}>Curren Category: {jokeCategory}</h1>
                        </div>
                    </Col>
                </Row>
                

            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    height: 100, 
                }}
            >
                All material on this website is intended for humorous entertainment (satire ) purposes only. 
                Credits to for the jokes <a href="https://api.chucknorris.io/">chucknorris!</a>. <CopyrightOutlined />
                
            </Footer>
        </Layout>
    </Layout>
  );
};

export async function getStaticProps(context) {
    try {
      const res = await axios.get('https://api.chucknorris.io/jokes/categories');
      const categories = await res.data;
      return { props: {categories} };
    } catch (error) {
      return { error };
    }
};

export default Home;

