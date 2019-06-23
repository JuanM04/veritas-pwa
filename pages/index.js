import React from 'react'
import Link from 'next/link'
import { Button, Container } from 'shards-react'



export default props => (
  <Container className="center index">
    <h1>Veritas</h1>
    <span>Creado por <a href="https://juanm04.com" rel="noopener noreferrer" target="_blank">JuanM04</a></span>
    <Link href="/acceder" prefetch>
      <Button>Acceder</Button>
    </Link>
  </Container>
)