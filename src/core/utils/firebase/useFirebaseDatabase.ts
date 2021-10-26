import { addDoc, collection } from '@firebase/firestore';
import { FormModel } from '../../models/FormModel';
import { db } from './firebase';

const useFirebaseDatabase = () => {
    const save = async (values: FormModel) => {
        try {
            return await addDoc(collection(db, "suscribedToCharacter"), values);
        } catch(e: any) {
            throw new Error(e);
        }
    }

    return {
        save
    }
}

export default useFirebaseDatabase;