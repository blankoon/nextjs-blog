import { GetStaticPaths, GetStaticProps } from 'next'
import { PostData, getAllPostIds, getPostData } from '../../lib/posts'

import Date from '../../components/date'
import Head from 'next/head'
import Layout from '../../components/layout'
import { ParsedUrlQuery } from 'querystring'
import utilStyles from '../../styles/utils.module.scss'

type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date ? postData.date : ""} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHTML ? postData.contentHTML : "" }} />
      </article>
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