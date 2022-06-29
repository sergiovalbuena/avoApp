import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { GetStaticProps } from 'next'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

//esta es una paguna Dinamica. 
//entonces debemos decirle cuales son todas las paginas 
export const getStaticPaths = async () => { 
  const response = await fetch('https://avoapp.vercel.app/api/avo')
  const { data: productList }: TAPIAvoResponse = await response.json()
  
  const paths = productList.map(({id}) => ({
    params: {
      id
    }
  }))

  return {
    paths,
    //incremntal static generation
    //cada pagina que no este incluida en el path dara un 404
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const response = await fetch(`https://avoapp.vercel.app/api/avo/${id}`)
  const product : TProduct = await response.json()

  return {
    props: {
      product,
    },
  }
}

const ProductPage = ({ product }: {product: TProduct}) => {
  
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
