import { LayoutNoFooter } from '@/components/Layouts/LayoutNoFooter'
import { Button, Divider, Flex, Input, InputGroup, Link, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react'
import { title } from 'process'
import React, { ReactElement } from 'react'



const newEpisode = () => {
    const [selectEnd, setValue] = React.useState('1')
    const [selectPlace, setValue2] = React.useState('1')
    return (
    <>
        <Flex flexDirection="column" alignItems="center" w="100vw">
          
          <Flex flexDirection='column' w="70vw">
            <Text my={10} fontSize='42px'>
            次話投稿
            </Text>
            <Text fontSize='24px'>
              タイトル
            </Text>
            <InputGroup mb={10}>
              <Input placeholder="タイトル"  />
            </InputGroup>
            <Text fontSize='24px'>
                本文
            </Text>
            <InputGroup mb={10}>
                <Textarea resize="vertical" rows="1" placeholder='本文を入力' />
            </InputGroup>
            <Text fontSize="24px">
                完結設定
            </Text>
            <RadioGroup size="sm" mb="10" onChange={setValue} 
                value={selectEnd}>
                <Stack direction='column'>
                    <Radio value='1'>この話で完結する</Radio>
                    <Radio value='2'>まだ完結しない</Radio>
                </Stack>
            </RadioGroup>
            <Text fontSize="24px">
                割り込み投稿                
            </Text>
            <RadioGroup size="sm" onChange={setValue2}
                value={selectPlace}
            >
                <Radio mr="3" value='1'>割り込み投稿をしない</Radio>
                <Radio value='2'>割り込み投稿をする</Radio>
            </RadioGroup>
            <Select placeholder='話を選択' size='sm'>
                <option>○話 タイトル</option>
                <option></option>
                <option></option>
                <option></option>
            </Select>
            <Button my="50px" w="20vw" mr="auto" ml="auto" 
            >
              投稿
            </Button>
          </Flex>
          
        </Flex>
      </>
  )
}

newEpisode.getLayout = (page: ReactElement) => {
    return (
      <LayoutNoFooter>
        {page}
      </LayoutNoFooter>
    )
  }

export default newEpisode