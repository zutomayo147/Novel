import { LayoutNoFooter } from '@/components/Layouts/LayoutNoFooter'
import CreateNovel from '@/drf/posts/CreateNovel'
import { Box, Button, chakra, Flex,Input,InputGroup,Radio,RadioGroup,RadioState,Text, Textarea, useDisclosure, useRadio } from '@chakra-ui/react'
import { validateHeaderValue } from 'http'
import { title } from 'process'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useCookies } from 'react-cookie'



const createIssue = () => {
    const [cookie, setCookie] = useCookies(['isLogin']);
    const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
    const [value, setValue] = useState('');
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    

    return (
    <>
        <Flex flexDirection='column' w="50vw" mx="auto">
            <Text my={10} fontSize='42px'>
                提案・感想フォーム
            </Text>
            <Text fontSize="24px">
                種別選択
            </Text>
            <RadioGroup my="5" onChange={setValue} value={value}>
                <Radio mr="3" value="1" >提案</Radio>
                <Radio value="2">感想</Radio>
            </RadioGroup>
            <Text fontSize="24px">
                場所の選択
            </Text>          
            <Flex borderWidth="medium"
            borderRadius="20" h="800px"
            borderColor="blackAlpha" p="5" mb="5"
            >
            ここに文章を読み込む
            </Flex>
            <Text fontSize="24px">
                タイトル
            </Text>
            <InputGroup mb={5}>
              <Input placeholder="タイトル" value={title} /*onChange={onChangeTitle}*/ />
            </InputGroup>
            <Text fontSize="24px">
                本文
            </Text>
            <Textarea
              onChange={onChangeContent}
              placeholder='本文'
              h="50vh"
              mb="10"
              overflow="auto"
            />
            <Button my="50px" w="20vw" mr="auto" ml="auto"
            /*onClick={onClickPost}*/
            >
              送信
            </Button>
        </Flex>

    </>
  )
}

createIssue.getLayout = (page: ReactElement) => {
    return (
      <LayoutNoFooter>
        {page}
      </LayoutNoFooter>
    )
  }

export default createIssue