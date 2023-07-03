import { customAlphabet} from 'nanoid';

export function validateVerificationCode(updatedAt) {    
    const currentTime = new Date();
    const codeCreationTime = new Date(updatedAt);
    const timeDifference = Math.abs(currentTime - codeCreationTime);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    console.log(minutesDifference)
    return minutesDifference <= 2;
}

export const createCode=()=>{
    const code = customAlphabet('0123456789', 5);
    return code();
}