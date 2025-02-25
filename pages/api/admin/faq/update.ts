import { NextApiRequest, NextApiResponse } from "next";
import { Faq } from "@prisma/client";
import * as jose from "jose";
import { prisma } from '../../../../prisma/prismaclient'

export default async function update(req: NextApiRequest, res: NextApiResponse) {

  const {payload} = await jose.jwtVerify(req.cookies.token || "", new TextEncoder().encode(process.env.PASSWORD))

  if (!payload) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const faqs: Faq[] = req.body
  const deletedFaqs = await prisma.faq.deleteMany({
    where: {
      NOT: {
        id: {
          in: faqs.map(faq => faq.id)
        }
      }
    }
  })
  const updateFaqs = await Promise.all(faqs.map(async (faq) => {
    return await prisma.faq.upsert({
      where: {
        id: faq.id
      },
      update: {
        question: faq.question,
        answer: faq.answer,
        orderInList: faq.orderInList
      },
      create: {
        question: faq.question,
        answer: faq.answer,
        orderInList: faq.orderInList
      }
    })
  }))
    
  res.json(updateFaqs)
}
