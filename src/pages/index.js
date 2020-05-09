import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { motion, useMotionValue, useTransform } from "framer-motion"

import indexStyles from "./index.module.css"

const IndexPage = () => {
  return (
    <>
      <div className={indexStyles.container}>
        <Section />
      </div>
    </>
  )
}

const Section = () => {
  const data = useStaticQuery(graphql`
    query {
      streetImage: file(relativePath: { eq: "Jaisalmer-47.jpg" }) {
        childImageSharp {
          fixed(width: 300, height: 500, cropFocus: CENTER, quality: 100) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      modelImage: file(relativePath: { eq: "Jaisalmer-14-2.jpg" }) {
        childImageSharp {
          fixed(width: 300, height: 500, cropFocus: CENTER, quality: 100) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)

  const divStart = 380
  const divEnd = 966
  const divMid = (divStart + divEnd) / 2

  const x = useMotionValue(divMid)
  const y = useMotionValue(divMid)

  const opacityRight = useTransform(x, [divStart, divMid, divEnd], [0.5, 1, 1])
  const opacityLeft = useTransform(x, [divStart, divMid, divEnd], [1, 1, 0.5])

  const scaleLeft = useTransform(x, [divStart, divEnd], [1.1, 0.9])
  const scaleRight = useTransform(x, [divStart, divEnd], [0.9, 1.1])

  const imagePositionRight = useTransform(
    x,
    [divStart, divMid, divEnd],
    [-30, 0, -30]
  )
  const imagePositionLeft = useTransform(
    x,
    [divStart, divMid, divEnd],
    [30, 0, 30]
  )

  const zIndexRight = useTransform(x, [divStart, divEnd], [0, 1])
  const zIndexLeft = useTransform(x, [divStart, divEnd], [1, 0])

  const titlePositionXRight = useTransform(
    x,
    [
      divStart,
      divStart + (divMid - divStart) / 2,
      divMid,
      divEnd - (divMid - divStart) / 2,
      divEnd,
    ],
    [-70, -15, 0, -30, -100]
  )

  const titlePositionXLeft = useTransform(
    x,
    [
      divStart,
      divStart + (divMid - divStart) / 2,
      divMid,
      divEnd - (divMid - divStart) / 2,
      divEnd,
    ],
    [100, 30, 0, 15, 70]
  )

  const titlePositionYRight = useTransform(
    x,
    [divStart, divMid, divEnd],
    [20, 0, -20]
  )
  const titlePositionYLeft = useTransform(
    x,
    [divStart, divMid, divEnd],
    [-20, 0, 20]
  )

  const titleScaleLeft = useTransform(x, [divStart, divEnd], [1.2, 0.8])
  const titleScaleRight = useTransform(x, [divStart, divEnd], [0.8, 1.2])

  const handleMouse = event => {
    x.set(event.pageX)
    y.set(event.pageY)
  }

  return (
    <div className={indexStyles.section}>
      <SectionTitle
        title="Fashion"
        titlePosition="left"
        positionX={titlePositionXLeft}
        positionY={titlePositionYLeft}
        scale={titleScaleLeft}
      />
      <motion.div className={indexStyles.sectionImageRow} onMouseMove={handleMouse}>
        <SectionImage
          image={data.modelImage.childImageSharp.fixed}
          scale={scaleLeft}
          position={imagePositionLeft}
          zIndex={zIndexLeft}
          opacity={opacityLeft}
          x={x}
        />
        <SectionImage
          image={data.streetImage.childImageSharp.fixed}
          scale={scaleRight}
          position={imagePositionRight}
          zIndex={zIndexRight}
          opacity={opacityRight}
          x={x}
        />
      </motion.div>
      <SectionTitle
        title="Street"
        titlePosition="right"
        positionX={titlePositionXRight}
        positionY={titlePositionYRight}
        scale={titleScaleRight}
      />
    </div>
  )
}

const SectionImage = ({ image, scale, position, zIndex, opacity }) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 1.5,
      },
    },
  }

  return (
    <motion.div
      exit="exit"
      variants={variants}
      className={indexStyles.homeImages}
      custom={scale.current}
      style={{
        scale: scale,
        x: position,
        zIndex: zIndex,
        opacity: opacity,
      }}
    >
      <Img fixed={image} />
    </motion.div>
  )
}

const SectionTitle = props => {
  const variants = {
    initial: {
      x: props.titlePosition === "left" ? 300 : -300,
    },
    visible: {
      x: 0,
    },
    exit: {
      scale: 0,
      transition: {
        duration: 1.5,
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      className={indexStyles.sectionTitle}
      style={{
        x: props.positionX,
        y: props.positionY,
        scale: props.scale,
        zIndex: 2,
      }}
    >
      {props.title}
    </motion.div>
  )
}

export default IndexPage
