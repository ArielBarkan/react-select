import styled from "styled-components";


//   marginLeft: "8px", fontSize: "14px", color: "#FFF" , backgroundColor:"#628fbb", borderRadius: "5px" , padding: "5px", width:"20px", justifySelf: "self-end"
const Counter = styled.p`
    background-color: #628fbb;
    border-radius: 5px;
    width: 15px;
    padding: 5px;
    color: #fff;
    
`
const SelectWrapper = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    div:first-of-type{
        flex-grow: 1;
    }
`
export {Counter,SelectWrapper}