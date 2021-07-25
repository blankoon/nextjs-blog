import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { PostData, getAllPostIds, getPostData } from '../../lib/posts'

import Layout from '../../components/layout'
import { ParsedUrlQuery } from 'querystring'

type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML ? postData.contentHTML : "" }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const postData = await getPostData(id)
  return {
    props: {
      postData
    }
  }
}