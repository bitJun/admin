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
  Upload,
  InputNumber,
  DatePicker,
  Flex
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useState, useEffect, useRef } from 'react';
import {
  updateActivity,
  addActivity,
  queryArticlesById,
  postUpload
} from '@/services/api';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMarkdown from 'react-markdown';
import './index.scss';

const { TextArea } = Input;

const ArticleDetail: React.FC = () => {
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
    id: undefined,
    readCount: 0
  });
  const [markdown, setMarkdown] = useState('');
  const [publishTime, setPublishTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const [form] = Form.useForm();
  const [editor, setEditor] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: (url: string, alt: string, href: string) => void) {
          console.log('file', file);
          let params = new FormData();
          params.append('files', file);
          let res = await postUpload(params);
          if (res) {
            insertFn(`https://youjia-admin.529603395.xyz/${res[0].url}`, file.name, `https://youjia-admin.529603395.xyz/${res[0].url}`); // 插入到编辑器
          }
        },
      },
    },
  };

  useEffect(() => {
    if (editor && type == 'detail') {
      editor?.disable();
    }
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor, type])

  useEffect(()=>{
    let type = searchParams.get('type');
    if (type == 'add') {
      setTitle('新增活动');
    }
    else if (type == 'edit') {
      setTitle('编辑活动');
    }
    else if (type == 'detail') {
      setTitle('活动详情');
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

  const handleChange = (file:any) => {
    let params = new FormData();
    params.append('files', file.file);
    postUpload(params)
      .then(res=>{
        console.log('res', res);
        if (res) {
          let data = res[0];
          setImageUrl(data.url)
        }
      })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onSubmit = () => {
    let params = form.getFieldsValue();
    if (imageUrl) {
      params.coverImage = imageUrl;
    } else {
      params.coverImage = '';
    }
    params.content = article.content;
    params.category = '';
    params.tagIds = [];
    params.content = markdown;
    params.publishTime = publishTime;
    if (id) {
      params.id = id;
      updateActivity(params)
        .then(res=>{
          message.success('编辑成功');
          history.back();
        })
    } else {
      addActivity(params)
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
        if (json.coverImage) {
          setImageUrl(json.coverImage);
        }
        setMarkdown(json.content);
        setPublishTime(json.publishTime);
        setArticle(json);
        setTitle('文章详情');
        form.setFieldsValue(json);
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
              labelCol={{ span: 6 }}
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
                  label='阅读量'
                  name='readCount'
              >
                  <InputNumber 
                    value={article.readCount}
                    placeholder='请输入阅读量'
                    disabled={type === 'detail'}
                    precision={0}
                    style={{
                      width: '100%'
                    }}
                  />
              </Form.Item>
              <Form.Item label="创建时间" >
                <DatePicker
                  showTime
                  value={dayjs(publishTime)}
                  format="YYYY-MM-DD HH:mm:ss"
                  onChange={(val:any)=>{
                    console.log('val',dayjs(val).format('YYYY-MM-DD HH:mm:ss'))
                    setPublishTime(dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
                  }}
                />
              </Form.Item>
              <Form.Item
                label="图片"
                name="coverImage"
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={(file)=>{handleChange(file)}}
                  disabled={type === 'detail'}	
                >
                  {imageUrl ? <img src={`https://youjia-admin.529603395.xyz/${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                label='内容'
                name='content'
              >
                {/* <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
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
                </div> */}
                <MarkdownEditor
                  value={markdown}
                  onChange={(value) => setMarkdown(value)}
                  height="400px"
                />
              </Form.Item>
              {
                type != 'detail' &&
                <Form.Item label='' wrapperCol={{ offset: 6, span: 18 }}>
                  <Flex gap={'20px'}>
                    <Button type='primary' onClick={onSubmit}>确定</Button>
                    <Button color="primary" variant="outlined" onClick={()=>{
                      history.back();
                    }}>返回</Button>
                  </Flex>
                </Form.Item>
              }
            </Form>
          </Col>
          <Col span={12}>
            <p>文章预览</p>
            <div>
              <h4>{article.title}</h4>
              <p>作者:&nbsp;&nbsp;{article.author}</p>
              <Flex justify='space-between'>
                <p>创建时间:&nbsp;&nbsp;{article.publishTime}</p>
                <p>阅读量:&nbsp;&nbsp;{article.readCount}</p>
              </Flex>
              {
                imageUrl ? (
                  <img
                    src={`https://youjia-admin.529603395.xyz/${imageUrl}`} 
                    style={{
                      width: '100%'
                    }}
                  />
                ) : null
              }
              {/* <div dangerouslySetInnerHTML={{__html: article.content}}></div> */}
              <div className='content'>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ArticleDetail
