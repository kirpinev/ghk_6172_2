import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import hero from "./assets/hero.png";
import drums from "./assets/drums.png";
import bag from "./assets/bag.png";
import ruble from "./assets/ruble.png";
import sim from "./assets/sim.png";
import pocket from "./assets/pocket.png";
import check from "./assets/check.png";
import pay from "./assets/pay.png";
import free from "./assets/free.png";
import light from "./assets/light.png";
import discount from "./assets/discount.png";
import transfer from "./assets/transfer.png";
import cash from "./assets/cash.png";
import calendar from "./assets/calendar.png";
import time from "./assets/time.png";
import person from "./assets/person.png";
import smart from "./assets/smart.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { Gap } from "@alfalab/core-components/gap";
import { useState } from "react";
import { ThxLayout } from "./thx/ThxLayout.tsx";
import { GearSIcon } from "@alfalab/icons-glyph/GearSIcon";

import "swiper/css";
import "swiper/css/pagination";
import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import { sendDataToGA } from "./utils/events.ts";

interface Product {
  title: string;
  text?: string;
  image: string;
  isSelected: boolean;
}

const products: Array<Product> = [
  {
    title: "+1 категория с кэшбэком 5%",
    text: "В популярной категории",
    image: bag,
    isSelected: true,
  },
  {
    title: "+1 попытка крутить барабан суперкэшбэка",
    text: "Выше шанс выиграть до 100% в случайной категории",
    image: drums,
    isSelected: true,
  },
  {
    title: "+2% годовых по накопительному счёту",
    text: "На ежедневный остаток",
    image: ruble,
    isSelected: true,
  },
  {
    title: "Бесплатная мобильная связь",
    text: "От Альфа Мобайл",
    image: sim,
    isSelected: true,
  },
  {
    title: "Увеличенный лимит кэшбэка",
    text: "До 7 000 ₽ в месяц",
    image: pocket,
    isSelected: true,
  },
  {
    title: "+0,1% по вкладу",
    image: pay,
    isSelected: false,
  },
  {
    title: "Бесплатные уведомления",
    text: "По всем дебетовым картам",
    image: free,
    isSelected: false,
  },
  {
    title: "Эксклюзивный кэшбэк",
    text: "Специальные предложения от партнёров",
    image: light,
    isSelected: false,
  },
  {
    title: "Выгодные операции на бирже",
    text: "0,24% по сделкам ценными бумагами и валютой",
    image: discount,
    isSelected: false,
  },
  {
    title: "Бесплатные переводы в рублях РФ",
    text: "В любые банки и даже по номеру карты",
    image: transfer,
    isSelected: false,
  },
  {
    title: "Снятие наличных до 200 000 ₽",
    text: "Без комиссии в любых банках России",
    image: cash,
    isSelected: false,
  },
  {
    title: "Пропуск платежа по кредитной карте",
    text: "Без штрафов и просрочек",
    image: calendar,
    isSelected: false,
  },
  {
    title: "+40 дней без % по кредитной карте",
    text: "Больше времени погасить долг",
    image: time,
    isSelected: false,
  },
  {
    title: "Персональная поддержка",
    text: "Выделенная линия в чате",
    image: person,
    isSelected: false,
  },
  {
    title: "Семейный доступ со скидкой 50%",
    text: "Всего 100 ₽ за 2 участников",
    image: smart,
    isSelected: false,
  },
];

export const App = () => {
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([
    ...products,
  ]);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const submit = () => {
    setLoading(true);

    sendDataToGA({
      change: String(isChanged),
      cat_boost: selectedProduct
        .filter((p) => p.isSelected)
        .map((p) => p.title)
        .map((p) => p.replace("+", "")),
      sub_sum: "399",
    }).then(() => {
      setLoading(false);
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={hero} alt="Картинка Альфа-Смарт" />
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
          >
            Альфа-Смарт
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Первый месяц бесплатно, <br /> а далее 399 ₽ в месяц
          </Typography.Text>

          <Gap size={20} />

          {selectedProduct
            .filter((p) => p.isSelected)
            .map((product) => (
              <div
                className={appSt.product}
                key={product.title}
                style={{ alignItems: "start", justifyContent: "space-between" }}
              >
                <div>
                  <Typography.TitleResponsive
                    font="system"
                    view="small"
                    weight="bold"
                    tag="h3"
                    className={appSt.productTitle}
                    style={{ ...(!product.text && { marginBottom: "0" }) }}
                  >
                    {product.title}
                  </Typography.TitleResponsive>

                  <Typography.Text
                    view="primary-small"
                    tag="p"
                    color="secondary"
                    className={appSt.productText}
                  >
                    {product.text}
                  </Typography.Text>
                </div>
                <img
                  src={product.image}
                  alt=""
                  height={96}
                  width={96}
                  className={appSt.productIcon}
                />
              </div>
            ))}

          <Gap size={12} />

          <div
            style={{
              display: "flex",
              margin: "0 auto",
              gap: "8px",
              alignItems: "center",
            }}
            onClick={() => {
              setIsOpen(true);
              setIsChanged(true);
            }}
          >
            <GearSIcon />
            <Typography.Text
              view="primary-large"
              tag="p"
              color="primary"
              weight="bold"
              className={appSt.productText}
            >
              Изменить привилегии
            </Typography.Text>
          </div>

          <Gap size={8} />
        </div>
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          loading={loading}
          block
          view="primary"
          href=""
          onClick={submit}
          size="xl"
        >
          Подключить
        </ButtonMobile>
      </div>

      <BottomSheet
        open={isOpen}
        onSwipeEnd={() => {
          setSelectedProduct([...products]);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        actionButton={
          <ButtonMobile
            onClick={() => setIsOpen(false)}
            style={{ width: "100%" }}
            size="xl"
            disabled={selectedProduct.filter((p) => p.isSelected).length < 5}
            hint={`Выбрано ${selectedProduct.filter((p) => p.isSelected).length} из 5`}
            view="primary"
          >
            Сохранить
          </ButtonMobile>
        }
      >
        <Gap size={32} />
        <Typography.TitleResponsive
          tag="h1"
          view="medium"
          font="system"
          weight="bold"
          style={{ textAlign: "center" }}
        >
          Привилегии
        </Typography.TitleResponsive>
        <Gap size={8} />
        <Typography.Text view="primary-medium" style={{ textAlign: "center" }}>
          Можно выбрать любые 5 привилегий
        </Typography.Text>
        <Gap size={32} />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {selectedProduct.map((product, index) => (
            <div
              className={appSt.product}
              key={product.title}
              style={{ backgroundColor: "#F2F3F5", margin: "0" }}
              onClick={() => {
                if (product.isSelected) {
                  const newP = Object.create(product);

                  newP.isSelected = false;
                  setSelectedProduct([
                    ...selectedProduct.slice(0, index),
                    newP,
                    ...selectedProduct.slice(index + 1),
                  ]);
                } else if (
                  !product.isSelected &&
                  selectedProduct.filter((p) => p.isSelected).length < 5
                ) {
                  const newP = Object.create(product);

                  newP.isSelected = true;
                  setSelectedProduct([
                    ...selectedProduct.slice(0, index),
                    newP,
                    ...selectedProduct.slice(index + 1),
                  ]);
                }
              }}
            >
              <img
                src={product.image}
                alt=""
                height={48}
                width={48}
                className={appSt.productIcon}
              />
              <div>
                <Typography.TitleResponsive
                  font="system"
                  view="small"
                  weight="bold"
                  tag="h3"
                  className={appSt.productTitle}
                >
                  {product.title}
                </Typography.TitleResponsive>

                <Typography.Text
                  view="secondary-large"
                  tag="p"
                  color="secondary"
                  className={appSt.productText}
                >
                  {product.text}
                </Typography.Text>
              </div>
              {product.isSelected ? (
                <img
                  src={check}
                  alt=""
                  style={{ marginLeft: "auto" }}
                  height="28"
                  width="28"
                />
              ) : (
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    minHeight: "22px",
                    minWidth: "22px",
                    border: "1px solid #DBDCDE",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    marginLeft: "auto",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <Gap size={32} />
      </BottomSheet>
    </>
  );
};
