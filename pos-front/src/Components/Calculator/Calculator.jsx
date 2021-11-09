import React, { useState } from "react"
import styled from "styled-components";

const CalculatorTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
    font-size: 30px;
`

const CalculatorButton = styled.button`
    font-size : 1.5rem;
    background-color : #D7FAFF;
    border-radius : 1.0rem;
    padding : 0;
`

const Calculator = ({num, num2, quantity, changeQuantity}) => {

    const ButtonClick = (e, number) => {
        e.preventDefault();
        if (number === "C") {
            quantity = "";
        }
        else if (number === "&lt") {
            quantity = quantity.slice(0, quantity.length-1);
        }
        else {
            e.preventDefault();
            console.log(number);
            quantity += number;
            console.log(quantity);
        }
        changeQuantity(quantity);
    }

    return (
        <CalculatorTable>
            <thead>
            <tr>
                <th><CalculatorButton
                    id='7' style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "7")}}>7</CalculatorButton></th>
                <th><CalculatorButton
                    id="8" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "8")}}>8</CalculatorButton></th>
                <th><CalculatorButton
                    id="9" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "9")}}>9</CalculatorButton></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th><CalculatorButton
                    id="4" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "4")}}>4</CalculatorButton></th>
                <th><CalculatorButton
                    id="5" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "5")}}>5</CalculatorButton></th>
                <th><CalculatorButton
                    id="6" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "6")}}>6</CalculatorButton></th>
            </tr>
            <tr>
                <th><CalculatorButton
                    id="1" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "1")}}>1</CalculatorButton></th>
                <th><CalculatorButton
                    id="2" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "2")}}>2</CalculatorButton></th>
                <th><CalculatorButton
                    id="3" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "3")}}>3</CalculatorButton></th>
            </tr>
            <tr>
                <th><CalculatorButton
                    id="0" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "0")}}>0</CalculatorButton></th>
                <th><CalculatorButton
                    id="00" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "00")}}>00</CalculatorButton></th>
                <th><CalculatorButton
                    id="C" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "C")}}>C</CalculatorButton></th>
            </tr>
            <tr>
                <th><CalculatorButton
                    id="<" style={{width: num , height: num}}
                    onClick={(e) => {ButtonClick(e, "&lt")}}>&lt;</CalculatorButton></th>
                <th colSpan="2"><CalculatorButton
                    id="Enter" style={{width: num2 , height: num}}
                    onClick={(e) => {ButtonClick(e, "")}}>Enter</CalculatorButton></th>
            </tr>
            </tbody>
        </CalculatorTable>
    )
}

export default Calculator;
