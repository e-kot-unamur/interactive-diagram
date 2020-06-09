import React, { useState } from 'react'
import 'static/sass/component/home/FeedbackSystem.scss'
import { Card, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap'
import { url, endpoints } from 'js/lib/api'
import axios from 'axios'
import { handlePropagation } from 'js/lib/utils'

function FeedbackSystem({ show, handleClose, ...props }) {
  // User inputs
  // reactions
  const [sadCry, setSadCry] = useState(false)
  const [grinHearts, setGrinHearts] = useState(false)
  // comment
  let commentRef = React.createRef()
  const [comment, setComment] = useState('')

  const setReaction = (option) => {
    if (option === 'first') {
      setGrinHearts(false)
      setSadCry(!sadCry)
    } else {
      setSadCry(false)
      setGrinHearts(!grinHearts)
    }
  }

  /**
   * Returns the user reaction  
   * 
   * @return {Boolean} true if resolved (grinHearts), false if unresolved (sadCry), null otherwise     
   */
  const getReaction = () => {
    return sadCry ? ('sadCry') : (grinHearts ? 'gringeHearts' : null)
  }

  /**
   * Send feedback to the API  
   * 
   * @param {String} emoji   User's reaction
   * @param {String} comment User's comment 
   * @return {Boolean}       True if HTTP status is 200
   */
  const sendFeedback = async (emoji, comment) => {
    console.log('%c sendFeedBack call', 'color:orange')
    console.log(emoji, comment)

    const req = url + endpoints['feedback']
    const body = { 'reaction': emoji, 'comment': comment }
    return await axios.post(req, body)
      .then(res => {
        console.log(`%c HTTP status : ${res.status}`, 'color:purple')
        return res.status === 200 ? true : false
      })
      .catch(error => {
        console.error(error)
        return false
      })
  }

  return (
    <div {...props}
      show-feedback={show ? 'true' : 'false'}
      onClick={e => handlePropagation(e)}
    >
      <span className='close-btn' onClick={() => handleClose()}>×</span>
      <Card className='feedback-system'>
        <Card.Body>
          <Card.Title>Problème résolu ?</Card.Title>
          <Card.Text>
            Votre avis nous intéresse !
          </Card.Text>
          <Row>
            <Col
              className={`option-container ${sadCry ? 'selected' : ''}`}
              onClick={() => setReaction('first')}
            >
              <span className='sad-cry-solid option' />
            </Col>
            <Col
              className={`option-container ${grinHearts ? 'selected' : ''}`}
              onClick={() => setReaction('second')}
            >
              <span className='grin-hearts-solid option' />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <InputGroup>
            <FormControl
              ref={commentRef}
              type='text'
              onChange={() => setComment(commentRef.current.value)}
            />
            <InputGroup.Append>
              <Button
                onClick={() => sendFeedback(getReaction(), comment)}>
                Envoyer
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Card.Footer>
      </Card>
    </div >
  )
}

export default FeedbackSystem