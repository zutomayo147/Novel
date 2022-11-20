import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from "components/Layouts/Layout"
import { ChangeEvent, ReactElement, ReactNode } from "react"

import Link from "next/link"
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import React, { useState, useCallback } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import bg from './assets/image/upload_bg.jpg'
import axios from 'axios'


import { useCookies } from 'react-cookie';

const acceptFile = ['image/*']

type MyFile = File & {
  preview: string
}


// const UserHome: NextPage = () => {
const Profile = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);

  const [isShow, setIsShow] = useState(false)
  const [files, setFiles] = useState<MyFile[]>([])
  const onDrop = useCallback((acceptedFiles: File[]) => {

    setIsShow(true)
    setFiles(acceptedFiles.map(
      file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ))
  }, [])

  // Dropzone
  const { getRootProps, getInputProps, isDragActive, open }
    = useDropzone({ noClick: true, onDrop, accept: { acceptFile } })

  const upload = () => {
    const data = new FormData()
    files.forEach(file => data.append('file', file))
    // axios.post('http://localhost:8000/image/', data)
    axios.post('http://0.0.0.0:8000/image/', data)
      .then(res => {
        console.log(res)
        setIsShow(false)
        setFiles([])
      })
      .catch(e => {
        console.log(e)
      })
  }



  if (cookie.isLogin) {
    return (
      <>
        <Flex h = "70vh">
          <Flex h="30vh" alignItems="center">
            <Container maxWidth="sm">
              <Card >
                <CardContent>
                  <Typography variant='h6' component='h2' >
                    Image uploader
                  </Typography>
                  <Typography component='p' color='textSecondary' >
                    drag & drop
                  </Typography>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    {isShow ? (
                      files.map(file => (
                        <Image key={file.name} src={file.preview} alt={file.name} width='200' />
                      ))
                    ) : (
                      <Image src={bg} alt='bg' className={'upload_img ' + (isDragActive ? 'is-on' : '')} width='200' />
                    )}
                    <input {...getInputProps()} />
                  </div>

                </CardContent>

                <CardActions >
                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    onClick={open}
                  >Select</Button>
                  {isShow && (
                    <Button
                      size='small'
                      color='primary'
                      variant='contained'
                      onClick={upload}
                    >Upload</Button>
                  )}
                </CardActions>
              </Card>
            </Container>
            <Text>Username</Text>
          </Flex>
          <Flex w = "70vw">
            pp

          </Flex>
        </Flex>
      </>
    )
  } else {
    return (
      <div>
        <p>No cookie</p>
        <p>Please login onemore</p>
        <Link href="/signIn">
          <Button>re-login</Button>
        </Link>
      </div>
    )
  }
}
Profile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Profile