import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'

export const Button = styled.button(
    {
        padding: '10px 15px',
        border: '0',
        lineHeight: '1',
        borderRadius: '3px',
    },
    props => ({
      background: props.variant === 'primary' ? '#3f51b5' : '#f1f2f7',
      color: props.variant === 'primary' ? 'white' : '#434449',
    })
);

// 🐨 Feel free to create as many reusable styled components here as you'd like
// 💰 in my finished version I have: Button, Input, CircleButton, Dialog, FormGroup

// 🎨 here are a bunch of styles you can copy/paste if you want
// Button:
//   padding: '10px 15px',
//   border: '0',
//   lineHeight: '1',
//   borderRadius: '3px',

// Button variant="primary" (in addition to the above styles)
//   background: '#3f51b5',
//   color: 'white',

// Button variant="secondary" (in addition to the above styles)
//   background: '#f1f2f7',
//   color: '#434449',


export const Input = styled.input
    ({
        borderRadius: '3px',
        border: '1px solid #f1f1f4',
        background: '#f1f2f7',
        padding: '8px 12px',
    })
;

export const FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
});


const CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    color: '#434449',
    border: `1px solid #f1f1f4`,
    cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
    maxWidth: '450px',
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    margin: '20vh auto',
    '@media (max-width: 991px)': {
        width: '100%',
        margin: '10vh auto',
    },
})

export {CircleButton, Dialog}
