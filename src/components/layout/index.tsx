import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import type { RootState } from "../../redux/store";
import type { FC } from "react";

// hem detail hem de edit sayfalarında url'deki parametreye göre note'un verilerini alsaydık kod tekrarına düşecektik bundan dolayı her ikisinin de ortak noktası olan layout comp'ında bu işlemi yapacağız ve prop olarak detail ve edit sayfalarına göndereceğiz.
const Layout: FC = () => {
  // store'daki note verilerine eriş
  const { notes } = useSelector((state: RootState) => state.notes);

  // url'den note'un id'sini al
  const { id } = useParams();

  // mevcut notların arsından id'si bilinen notu bul
  const found = notes.find((note) => note.id === id);

  // eğer bulamazsak anasayfaya yönlendir
  if (!found) {
    return <Navigate to="/" replace />;
  }

  // alt route'un elementini ekrana bas ve prop olarak note'u gönderiyoruz.
  return <Outlet context={found} />;
};

export default Layout;
