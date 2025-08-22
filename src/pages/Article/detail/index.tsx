import { PageContainer } from '@ant-design/pro-components';
import {
  useSearchParams,
  history
} from 'umi';
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Select,
  Flex,
  Tag
} from 'antd';
import dayjs from 'dayjs';
import React, { useState, useEffect, useRef } from 'react';
import {
  queryArticlesTags,
  updateArticles,
  addArticles,
  queryArticlesById
} from '@/services/api';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

const { TextArea } = Input;
const AccessPage: React.FC = () => {
  const [tags, setTags] = useState([]);
  const [tagInfo, setTagInfo] = useState<any>({});
  const [id, setId] = useState<any>('');
  const [type, setType] = useState<any>('');
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [article, setArticle] = useState({
    title: '',
    author: '',
    publishTime: '',
    coverImage: '',
    content: '',
    category: '',
    tagIds: [],
    id: undefined
  });
  const [form] = Form.useForm();
  const [editor, setEditor] = useState<any>(null);
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
  };

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(()=>{
    let type = searchParams.get('type');
    if (type == 'add') {
      setTitle('新增文章');
    }
    else if (type == 'edit') {
      setTitle('编辑文章');
    }
    else if (type == 'detail') {
      setTitle('文章详情');
    }
    setType(type);
    if (searchParams.get('id')) {
      let val = searchParams.get('id');
      setId(val);
    }
  }, []);

  useEffect(()=>{
    if (id) {
      onDetail(id);
    }
  }, [id]);

  useEffect(()=>{
    onLoadTag(); 
  }, []);

  useEffect(()=>{
    if (tags) {
      let info:any = {};
      tags.forEach((item:any)=>{
        info[item.id] = item.name;
      });
      setTagInfo(info);
      setTagInfo(info);
    }
  }, [tags]);

  const onLoadTag = () => {
    queryArticlesTags()
      .then(res=>{
        setTags(res.data.filter((item:any)=>item.category === 'education'));
      });
  }

  const onSubmit = () => {
    let params = {
      ...article
    }
    console.log('params',params)
    params.category = 'education';
    if (params.id) {
      updateArticles(params)
        .then(res=>{
          message.success('编辑成功');
          history.back();
        })
    } else {
      params.publishTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      addArticles(params)
        .then(res=>{
          message.success('新增成功');
          history.back();
        })
    }
  }

  const onDetail = (id: number) => {
    queryArticlesById(id)
      .then(res=>{
        let json = {...res.data};
        if (json.tags) {
          let ids:any = [];
          json.tags.forEach((item:any)=>{
            ids.push(item.id);
          })
          json.tagIds = ids;
        }
        form.setFieldsValue(json);
        console.log(json)
        setArticle(json);
        setTitle('文章详情');
      });
  }

  const onChangeHtml = (editor:any) => {
    let data = {...article};
    data.content = editor.getHtml();
    setArticle(data);
  }

  return (
    <PageContainer
      ghost
      header={{
        title: title
      }}
    >
      <Card>
        <Row gutter={24}>
          <Col span={12}>
            <Form
              form={form}
              initialValues={article} 
              onValuesChange={(val)=>{
                setArticle({
                  ...article,
                  ...val
                })
              }}
            >
              <Form.Item
                label='标题'
                name='title'
              >
                <Input 
                  value={article.title}
                  placeholder='请输入标题'
                  disabled={type === 'detail'}
                />
              </Form.Item>
              <Form.Item
                  label='作者'
                  name='author'
              >
                  <Input 
                    value={article.author}
                    placeholder='请输入作者'
                    disabled={type === 'detail'}
                  />
              </Form.Item>
              <Form.Item
                label='内容'
                name='content'
              >
                <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                  <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                  />
                  <Editor
                    defaultConfig={editorConfig}
                    value={article.content}
                    onCreated={setEditor}
                    onChange={(editor:any)=>{
                      onChangeHtml(editor)
                    }}
                    mode="default"
                    style={{ height: '300px', overflowY: 'hidden' }}
                  />
                </div>
              </Form.Item>
              <Form.Item
                label='标签'
                name='tagIds'
              >
                  <Select
                    mode='multiple'
                    value={article.tagIds}
                    disabled={type === 'detail'}
                  >
                    {
                      tags.map((item:any)=>
                      <Select.Option
                          key={item.id}
                          value={item.id}
                      >
                          {item.name}
                      </Select.Option>
                      )
                    }
                  </Select>
              </Form.Item>
              {
                type != 'detail' &&
                <Form.Item>
                  <Button type='primary' onClick={onSubmit}>确定</Button>
                </Form.Item>
              }
            </Form>
          </Col>
          <Col span={12}>
            <p>文章预览</p>
            <div>
              <h4>{article.title}</h4>
              <p>作者:&nbsp;&nbsp;{article.author}</p>
              <Flex>
                标签:&nbsp;&nbsp;
                {
                  article.tagIds.map((item:any)=>
                    <Tag key={item}>
                      {tagInfo[item]}
                    </Tag> 
                  )
                }
              </Flex>
              <div dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default AccessPage
