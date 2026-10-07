import { useEffect, useState } from 'react'
import axios from 'axios'
import './About.css'

const About = () => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState('')

  // Get the page content from the back end when the component loads.
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAbout(response.data)
      })
      .catch(() => {
        setError('Unable to load the About Us page.')
      })
  }, [])

  if (error) {
    return <p role="alert">{error}</p>
  }
  if (!about) {
    return <p role="status">Loading...</p>
  }

  return (
    <div className="About">
      <h1>{about.title}</h1>
      <h2>{about.name}</h2>
      <img
        src={`${import.meta.env.VITE_SERVER_HOSTNAME}${about.imageUrl}`}
        alt={about.imageAlt}
      />
      {about.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

export default About
