import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useLocalSlice } from 'use-local-slice';

import BlankCard from '@components/shared/BlankCard';
import Counter from '@components/shared/Counter/Counter';
import config from '@config/index';
import { IGallery } from '@models/gallery';
// MUI Elements
import {
    Box, Button, CardContent, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Divider,
    Grid, Stack, Typography, useTheme
} from '@mui/material';
import { AppState, useDispatch, useSelector } from '@store/Store';
import { decreaseAmount } from '@store/user/UserSlice';

import AlertCart from '../productCart/AlertCart';

type ProductDetailProps = {
  productId?: string;
};

export const infoData = {
  "2": "Alles, was in den großen Auktionshäusern angeboten wird, hat eine Provenienz (das ist eine Aufzeichnung über den Besitzer eines Kunstwerks oder einer Antiquität, die als Hinweis auf die Echtheit oder Qualität dient).",
  "4": "Die Provenienz kann den Wert des Werks entweder erhöhen oder senken, je nachdem, wem es im Laufe seiner Geschichte gehörte, welche Institutionen es ausgestellt oder ausgeliehen hatten.",
  "6": "Für diejenigen unter euch, die nicht wissen, was ein Schätzungwert ist: Es werden zwei Werte festgelegt, ein niedriges und eine hohes, die eine Bandbreite dazwischen stellt dar, für wie viel das Stück nach Meinung von Experten verkauft werden sollte.",
  "8": "Das Auktionshaus veröffentlicht vor einer Auktion einen Katalog mit den Informationen über den Verkauf, sowie über die Werke des Künstlers, eine detaillierte Beschreibung des Stückes,  das Jahr seiner Entstehung und die Größe der Ausstellung",
  "10": "Obwohl die meisten großen Auktionshäuser seriös sind, ist es sehr wichtig, dass Du als Käufer, deine eigene Recherche über das Kunstwerk machst. Denn sobald Du auf Bieten drückst oder die Hand hebst, bist du im Spiel.",
  "12": "Stelle auch sicher, dass das Kunstwerk, an dem du interessiert bist, authentifiziert ist, also einen Nachweis über seine Echtheit hat.",
  "14": "Für die zeitgenössische Kunst kann das manchmal schwer sein, aber vergewissere dich, dass du bei dem Kauf oder vor dem Kauf und dem Zuschlag alles weißt, was es über das Stück zu wissen gibt.",
  "16": "Käufer müssen sich auch der ungeschriebenen Auktionsregeln bewusst sein, unabhängig davon, ob Sie online, persönlich oder per Telefon bieten, denke daran, dass in der Regel eine Live-Auktion stattfindet und der Bieter das Recht hat, dein Gebot zu übergehen. Das höchste Gebot gewinnt schließlich. Wenn das Gebot 10 tausend ist, antizipiere dass das nächste 15 tausend sein wird. Wenn du vielleicht 12 bietest besteht die Möglichkeit, dass dein Gebot nicht berücksichtigt wird, weil es die Auktion verlangsamt.",
  "18": "Habe aber keine Angst, in der Auktion zu bieten. sei darauf vorbereitet, nehme dir vorher Zeit, um die Kunst zu studieren, informiere dich über den Markt und versuche, dich nicht nur darauf zu versteifen, das Gebot zu gewinnen, sondern engagiere dich auf allen Ebenen.",
  "20": "Gehe zu den Galerien, besuche die Museen und die Ateliers des Künstlers. Lass dir dabei viel Zeit. Je mehr Informationen du hast, desto mehr kannst du selbst einschätzen, ob der Preis angemessen ist. Auktionshäuser investieren in der Regel viel Zeit in Schätzungen, aber kenne den Markt selbst und kaufe nicht nur mit deinem Herzen, sondern auch mit deinem Kopf. ",
  "22": "Was bei einer Auktion zählt, ist der Preis. Nur welcher Preis ... Erfahre mehr über die verschiedenen Arten von Preisen, die dich bei einer klassischen Auktion antreffen",
  "24": "Schätzpreis - kurz Schätzung genannt, wird in Klammern 'von - bis' neben einem bestimmten Objekt angegeben, das zur Versteigerung angeboten wird, in der Regel in Auktionskatalogen. Die Spanne dieses Preises wird auf der Grundlage des geschätzten Wertes bei der Auktion voraussichtlich erzielt werden. Die Schätzung setzt sich aus vielen Faktoren zusammen, darunter die Auktionsergebnisse ähnlicher Werke, die Preise von Werken eines bestimmten Künstlers, der Erhaltungszustand des Objekts und andere Daten des Kunstmarkts, die der Sachverständige, der die Bewertung vornimmt und den Schätzpreis festlegt, berücksichtigen sollte. Der Schätzpreis ist nicht der Verkaufspreis.",
  "26": "Startpreis - der Preis, mit dem das Bieten beginnt, das so genannte erste Gebot während der Auktion. Das Bieten kann beim Startpreis enden, wenn es keine Käufer gibt, die bereit sind, den Preis zu erhöhen. Der Startpreis wird auf der Grundlage des Schätzpreises festgelegt.",
  "28": "Zuschlagspreis - ein Preis, der durch einen Zuschlag des Versteigerers verkündet wird und daher auch seinen Namen hat. Der Zuschlagspreis ist der Betrag, der geboten wird, aber nicht der endgültige und tatsächliche Betrag, der für das Objekt zu zahlen ist.",
  "30": "Der Verkaufspreis - auch als tatsächlicher Preis oder Kaufpreis bezeichnet - ist der Betrag des Zuschlagspreises zuzüglich etwaiger Gebühren, Provisionen und Organisationskosten des Auktionshauses, wie sie in den Auktionsregeln festgelegt sind. Wenn Sie auf ein Werk bieten, werden Sie feststellen, dass ein wenig mehr als der Zuschlagspreis von Ihrem Konto verschwunden ist. Dies ist die Provision des Auktionshauses.",
  "32": "Reservepreis - ein vertraulicher Preis, der den Käufern nicht bekannt gegeben wird, ist der niedrigste Mindestbetrag, für den ein Werk bei einer Auktion verkauft werden kann. Nicht jedes ausgestellte Objekt muss einen Mindestpreis haben. Kann der Mindestpreis nicht erreicht werden, kann der Verkauf mit einem Vorbehaltsgeschäft enden. Der Wert des Reservepreises liegt zwischen dem Angebotspreis, von dem aus er höher sein sollte, und der Untergrenze des Schätzpreises.",
  "34": "Merke dir all diese Informationen, denn Wissen ist Goldwert.",
  "36": "In Polen haben die registrierten Museen (d. h. die vom Kulturminister im staatlichen Museumsregister eingetragenen) das Vorkaufsrecht für eine versteigerte Antiquität.",
  "38": "Will das Museum von seinem Vorkaufsrecht Gebrauch machen, muss es dies unmittelbar nach der Versteigerung des Denkmals, spätestens jedoch nach Abschluss der gesamten Auktion, erklären.",
  "40": "Die erste Auktion ist abgeschlossen.",
};

const randRange = (data) => {
  var newTime = data[Math.floor(data.length * Math.random())];
  return newTime;
};

const ProductDetail: FC<ProductDetailProps> = ({ productId }) => {
  const theme = useTheme();
  const botTimer = useRef(null);
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const ballance = useSelector((state) => state.userReducer.amount);

  const product: IGallery | any = useSelector(
    (state: AppState) => state.galleryReducer.gallery[Number(productId) - 1]
  );

  const [state, dispatchAction] = useLocalSlice({
    slice: "auctions", // optional - will be displayed in the debug tools
    initialState: {
      currentPrice: 0,
      nextPrice: 0,
      offers: [
        { name: "Ihr Angebot", price: 0 },
        { name: "Zimmer", price: 0 },
        { name: "Internet", price: 0 },
        { name: "Telefon", price: 0 },
      ],
    },
    reducers: {
      updateCurrentPrice: (state, action: { payload: number }) => {
        state.currentPrice = action.payload;
      },
      upgradeNextPrice: (state, action: { payload: number }) => {
        state.nextPrice = action.payload;
      },
      calcNextPrice: (state) => {
        if (state.currentPrice < product.priceStart) {
          return;
        }

        const stepPrice =
          state.currentPrice <= config.higherBindLimit
            ? config.nextPriceBind
            : config.higherNextPriceBind;

        state.nextPrice = state.currentPrice + stepPrice;
      },
      increaseByBot: (state) => {
        const botName = ["Zimmer", "Internet", "Telefon"];
        const name = botName[Math.floor(Math.random() * botName.length)];

        state.currentPrice = state.nextPrice;
        state.offers = state.offers.map((offer) => {
          if (offer.name === name) {
            return {
              ...offer,
              price: state.nextPrice,
            };
          }
          return offer;
        });
      },
      increaseByUser: (state, action: { payload: number }) => {
        state.currentPrice = action.payload;
        state.offers = state.offers.map((offer) => {
          if (offer.name === "Ihr Angebot") {
            return {
              ...offer,
              price: action.payload,
            };
          }
          return offer;
        });
      },
    },
  });

  const [cartalert, setCartalert] = React.useState(false);
  console.log("isover", isOver);
  function botTrigger() {
    if (isOver) {
      return;
    }
    console.log("Boot Trigger");
    dispatchAction.calcNextPrice();
    dispatchAction.increaseByBot();
  }

  function botPriceUp() {
    const timeArray = new Array(2000, 3000, 5000);
    clearTimeout(botTimer.current);
    if (!isOver) {
      botTrigger();
      console.log("after clear", botTimer.current);
      botTimer.current = setTimeout(botPriceUp, randRange(timeArray));
    }
  }

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  const handleUserBind = () => {
    dispatchAction.increaseByUser(state.nextPrice);
    dispatchAction.calcNextPrice();
  };

  const redirect = () => {
    const nextAuction = Number(product.id) + 1;
    console.log(nextAuction);
    if (nextAuction < 41) {
      router.push(`/auctions/details/${nextAuction}`);
    }
  };

  const handleTextModalComplete = () => {
    setIsOver(true);
    setShowModal(false);
    redirect();
  };

  const handleSumUp = () => {
    // pobrać hajs
    // sprawdzić czy tutaj wyświetla się napis, jak to to wyświetlić
    // wysłać żadanie do bazy z infomacjami o aukcji.
    // jeżeli to inna niż 40 aukcja przekierować na następną

    setIsOver(true);
    console.log("sumUp over", isOver);

    // clearTimeout(botTimer.current);

    if (Number(product.id) % 2 === 0) {
      console.log(infoData[productId]);
      setShowModal(true);
    } else {
      redirect();
    }
  };

  useEffect(() => {
    console.log("effect");
    botTimer.current = setTimeout(botPriceUp, 1000);
    return () => {
      clearTimeout(botTimer.current);
    };
  }, [productId]);

  useEffect(() => {
    dispatchAction.updateCurrentPrice(product.priceStart);
    dispatchAction.calcNextPrice();
  }, [productId]);

  return (
    <Box p={2}>
      {product ? (
        <>
          <Box display="flex" alignItems="center" key={productId}>
            <Box>
              <Stack direction="row" alignItems={"center"} gap={2}>
                <Chip label="Auction" color="success" size="small" />
                <Chip
                  label={`AU-SKU-${product.photo.slice(0, -4)}`}
                  color="info"
                  size="small"
                />
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                <Typography
                  color="textSecondary"
                  variant="caption"
                  ml={1}
                  textTransform="capitalize"
                >
                  {product?.category}
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Box mb={3}>
            <Stack
              direction="row"
              mt={2}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Box sx={{ width: "75%" }}>
                <Typography fontWeight="600" variant="h4">
                  {product?.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.text.secondary}
                >
                  {product.autor}
                </Typography>
              </Box>
              {!isOver && (
                <Counter
                  size={100}
                  duration={config.auctionTime}
                  handlerOnComplete={() => {
                    handleSumUp();
                    return { shouldRepeat: true };
                  }}
                />
              )}
            </Stack>
            <Stack direction="row" mt={2} gap={2} alignItems={"center"}>
              <Typography mt={2} variant="body1" fontWeight={600}>
                Angebotspreis:
              </Typography>
              <Typography mt={2} variant="h5" fontWeight={600}>
                {new Intl.NumberFormat().format(product.priceStart)}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box mb={1}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box>
                <Typography my={3} variant="h6" fontWeight={600}>
                  Derzeitiger Preis:
                </Typography>
              </Box>
              <Box>
                <Typography my={3} variant="h6" fontWeight={600}>
                  {new Intl.NumberFormat().format(state.currentPrice)}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Grid item xs={12}>
            {[...state.offers]
              .sort((a, b) => b.price - a.price)
              .map((item) => (
                <BlankCard sx={{ mb: 1, p: 1 }} key={item.name}>
                  <CardContent sx={{ my: 1 }}>
                    <Stack direction="row" gap={2} alignItems="center">
                      <Box>
                        <Typography
                          variant="h6"
                          textOverflow={"ellipsis"}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Box ml="auto">
                        {new Intl.NumberFormat().format(item.price)}
                      </Box>
                    </Stack>
                  </CardContent>
                </BlankCard>
              ))}
          </Grid>
          <Box mb={2}></Box>
          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
              <Button
                color="error"
                size="large"
                fullWidth
                variant="contained"
                disabled={isOver}
                onClick={() => handleUserBind()}
                sx={{ p: 2, borderRadius: "50px" }}
              >
                Biete {new Intl.NumberFormat().format(state.nextPrice)}{" "}
                Nawa-Marken an
              </Button>
            </Grid>
          </Grid>
          {/* ------------------------------------------- */}
          {/* Alert When click on add to cart */}
          {/* ------------------------------------------- */}
          <AlertCart handleClose={handleClose} openCartAlert={cartalert} />

          <Dialog fullWidth open={showModal} onClose={handleClose}>
            <DialogTitle align={"right"}>
              <Counter
                size={100}
                duration={30}
                handlerOnComplete={handleTextModalComplete}
              />
            </DialogTitle>
            <DialogContent>
              {!!infoData[product.id] && (
                <DialogContentText>
                  <Typography variant="body1">
                    {infoData[product.id]}
                  </Typography>
                </DialogContentText>
              )}
              <Box
                noValidate
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "fit-content",
                }}
              ></Box>
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};

export default ProductDetail;
