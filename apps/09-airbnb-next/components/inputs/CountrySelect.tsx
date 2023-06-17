'use client';

import { FC, useCallback } from 'react';
import Select from 'react-select';

import { CountrySelectValue } from '@/types';
import { useCountries } from '@/hooks';

interface CountrySelectProps {
  value?: CountrySelectValue,
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCountries();

  const formatOptionLabel = useCallback(
    (option: any) => (
      <div className='flex flex-row items-center gap-3'>
        <div>{option.flag}</div>
        <div>
          {option.label},
          <span className='text-neutral-500 ml-1'>
            {option.region}
          </span>
        </div>
      </div>
    ),
    [],
  )
  
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={formatOptionLabel}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default CountrySelect