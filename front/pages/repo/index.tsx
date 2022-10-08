import type { NextPage } from 'next'

import LpFooter from "@/components/Organisms/LpFooter"
import LpHeader from "@/components/Organisms/LpHeader"

import RepoHeader from "@/components/Organisms/RepoHeader"
import RepoTabs from "@/components/Organisms/RepoTabs"
import RepoNav from "@/components/Organisms/RepoNav"
import RepoList from "@/components/Organisms/RepoList"
// import Head from 'next/head'
// import Image from 'next/image'
import { Grid, GridItem } from '@chakra-ui/react'


const Home: NextPage = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "repoheader repoheader"
                  "main nav"
                  "footer footer"`}
      gridTemplateRows={'50px 100px 1fr 30px'}
      gridTemplateColumns={'1fr 350px'}
    >
      <GridItem area={'header'}>
        <LpHeader></LpHeader>
      </GridItem>
      <GridItem area={'repoheader'}>
        <RepoHeader></RepoHeader>
        <RepoTabs></RepoTabs>
      </GridItem>
      <GridItem area={'main'}>
        <RepoList></RepoList>
      </GridItem>
      <GridItem area={'nav'}>
        <RepoNav></RepoNav>
      </GridItem>
      <GridItem area={'footer'}>
        <LpFooter></LpFooter>
      </GridItem>
    </Grid>
  )
}

export default Home