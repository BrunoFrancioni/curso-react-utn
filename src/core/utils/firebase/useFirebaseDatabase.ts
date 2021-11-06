import { addDoc, collection, doc, setDoc, getDoc } from '@firebase/firestore';
import { FavoriteModel } from '../../models/FavoriteModal';
import { FormModel } from '../../models/FormModel';
import { db } from './firebase';

const useFirebaseDatabase = () => {
    const saveForm = async (values: FormModel) => {
        return await addDoc(collection(db, "suscribedToCharacter"), values);
    }

    const saveFavorites = async (id_user: string, values: FavoriteModel) => {
        return await setDoc(doc(db, "favorites", id_user), {
            favs: [...values.characters]
        });
    }

    const getFavorites = async (id: string) => {
        const favsRef = doc(db, "favorites", id);

        return await (await getDoc(favsRef)).data();
    }

    return {
        saveForm,
        saveFavorites,
        getFavorites
    }
}

export default useFirebaseDatabase;