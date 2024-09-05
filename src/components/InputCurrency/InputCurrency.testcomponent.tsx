import React, { useState, useEffect, useRef } from 'react';

function formatNumber(value: string): string {
   return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatCurrency(value: string, blur: boolean = false): string {
   let inputVal = value;

   if (inputVal === '') return '';

   let originalLen = inputVal.length;
   let caretPos = originalLen;

   if (inputVal.includes('.')) {
      const [leftSide, rightSide] = inputVal.split('.');

      let formattedLeft = formatNumber(leftSide);
      let formattedRight = formatNumber(rightSide);

      if (blur) {
         formattedRight += '00';
      }

      formattedRight = formattedRight.substring(0, 2);
      inputVal = `${formattedLeft}.${formattedRight}`;
   } else {
      inputVal = `${formatNumber(inputVal)}`;

      if (blur) {
         inputVal += '.00';
      }
   }

   return inputVal;
}

interface CurrencyInputProps {
   value: string;
   onChange: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const handleKeyUp = () => {
      if (inputRef.current) {
         const formattedValue = formatCurrency(inputRef.current.value);
         onChange(formattedValue);
      }
   };

   const handleBlur = () => {
      if (inputRef.current) {
         const formattedValue = formatCurrency(inputRef.current.value, true);
         onChange(formattedValue);
      }
   };

   useEffect(() => {
      if (inputRef.current) {
         const originalLen = inputRef.current.value.length;
         const caretPos = originalLen - value.length + inputRef.current.selectionStart!;
         inputRef.current.setSelectionRange(caretPos, caretPos);
      }
   }, [value]);

   return (
      <div className='py-2'>
         <form>
            <input
               type='text'
               name='currency-field'
               id='currency-field'
               value={value}
               data-type='currency'
               placeholder='0.00'
               onKeyUp={handleKeyUp}
               onBlur={handleBlur}
               onChange={(e) => onChange(e.target.value)}
               ref={inputRef}
               className='p-2'
            />
         </form>
      </div>
   );
};

export default CurrencyInput;
