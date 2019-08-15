import React from 'react'
import './Display.css'

export default props =>
    <div className="display">{props.value}</div>

// import React from 'react'
// import './Display.css'


// export default props => 
// {
//     let classes = 'button '
//     classes += props.operation ? 'operation' : ''
//     classes += props.double ? 'double' : ''
//     classes += props.triple ? 'triple' : ''

//     return (
//         <button 
//         // onClick={e => props.Click && props.Click(e.target.innerHTML)}
//         onClick={e => props.Click && props.Click(props.label)}
//         className={ classes}>{props.value}</button>
//     )



//     // return (
//     //     <button className={`
//     //     button
//     //     ${props.operation ? 'operation' : ''}
//     //     ${props.double ? 'double': ''}
//     //     ${props.triple ? 'triple': ''}
//     //      `
//     //    }>
//     //     {props.value}
//     //     </button>
//     // )
// }
   