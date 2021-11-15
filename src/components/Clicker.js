import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, runTransaction, doc } from 'firebase/firestore'
import db from '../config/db'

export default function Clicker() {
  const [value, setValue] = useState(0)
  const clicksCollectionRef = collection(db, 'clicks')
  const amountDocRef = doc(db, 'clicks', 'fuUwVrgOf8uptXfli84F')

  const onClick = async (value) => {
    try {
      const newAmount = await runTransaction(db, async (transaction) => {
        const clickDoc = await transaction.get(amountDocRef)

        if (!clickDoc.exists()) {
          throw Error('Document does not exist!')
        }

        const newAmount = clickDoc.data().amount + value
        transaction.update(amountDocRef, { amount: newAmount })
        return newAmount
      })
      setValue(newAmount)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getAmount = async () => {
      const data = await getDocs(clicksCollectionRef)
      setValue(data.docs.find((doc, id) => id === 0).data().amount)
    }
    getAmount()
  }, [])

  return (
    <Box
      sx={{
        maxWidth: '94%',
        width: '400px',
        textAlign: 'center',
        borderRadius: '50px',
        background: 'primary.dark',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom={true} variant="h1">
            {value}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button onClick={() => onClick(-1)} variant="outlined">
              Decrease
            </Button>
            <Button onClick={() => onClick(1)} variant="outlined">
              Increase
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
