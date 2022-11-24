import { LayoutNoFooter } from '@/components/Layouts/LayoutNoFooter'
import { Button, Divider, Flex, Input, InputGroup, Link, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react'
import { title } from 'process'
import React, { ReactElement } from 'react'



const newEp = () => {
    const [selectEnd, setEnd] = React.useState('0')
    const [selectPlace, setPlace] = React.useState('0')
    return (
    <>
        <Flex flexDirection='column' w="50vw" mx="auto">
          <Text my={10} fontSize='42px'>
          次話投稿
          </Text>
          <Text fontSize='24px'>
            サブタイトル
          </Text>
          <InputGroup mb={10}>
            <Input placeholder="サブタイトル"  />
          </InputGroup>
          <Text fontSize='24px'>
              本文
          </Text>
          <InputGroup mb={10}>
              <Textarea resize="vertical" rows="20" placeholder='本文' />
          </InputGroup>
          <Text fontSize="24px">
              完結設定
          </Text>
          <RadioGroup size="sm" mb="10" onChange={setEnd} 
              value={selectEnd}>
              <Stack direction='column'>
                  <Radio value='0'>まだ完結しない</Radio>
                  <Radio value='1'>この話で完結する</Radio>
              </Stack>
          </RadioGroup>
          <Text fontSize="24px">
              割り込み投稿                
          </Text>
          <RadioGroup size="sm" onChange={setPlace}
              value={selectPlace}
          >
              <Radio mr="3" value='0'>割り込み投稿をしない</Radio>
              <Radio value='1'>割り込み投稿をする</Radio>
          </RadioGroup>
          <Select placeholder='話を選択' size='sm'>
              <option>○話 サブタイトル</option>
              <option></option>
              <option></option>
              <option></option>
          </Select>
          <Button my="50px" w="20vw" mr="auto" ml="auto" 
          >
            投稿
          </Button>
        </Flex>
      </>
  )
}

newEp.getLayout = (page: ReactElement) => {
    return (
      <LayoutNoFooter>
        {page}
      </LayoutNoFooter>
    )
  }

export default newEp