import styled from "styled-components";


//   marginLeft: "8px", fontSize: "14px", color: "#FFF" , backgroundColor:"#628fbb", borderRadius: "5px" , padding: "5px", width:"20px", justifySelf: "self-end"
const Counter = styled.p<any>`
    visibility: ${(props) => (props.isMaxReached ? "visible" : "hidden")};;
    background-color: #628fbb;
    border-radius: 5px;
    width: 20px;
    height: 20px;
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

const Label = styled.label<{ isFloating?: boolean }>`
    left: 10px;
    top:-5px;
    pointer-events: none;
    //position: absolute;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    top: ${(props) => (props.isFloating ? `5px` : `35%`)};
    font-size: ${(props) => (props.isFloating ? `0.5rem` : `1rem`)};
`;
export {Counter,SelectWrapper, Label}