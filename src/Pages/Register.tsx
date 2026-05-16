import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SuccessModal } from "@/components/registration/SuccessModal"
import { NeuralGrid } from "@/components/landing/NeuralGrid"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyOKaocY_Vp_QS0IGPyD7yNXIfmwonislNH3L_i8tKCT6UwHuH7ZsSMoTJWNe6Ri0EN0g/exec"

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Ism kiritish majburiy"),
  lastName: z.string().trim().min(1, "Familiya kiritish majburiy"),
  email: z.string().trim().email("To'g'ri email manzil kiriting"),
  phone: z.string().trim().min(7, "To'g'ri telefon raqam kiriting"),
  institution: z.string().trim().min(1, "Muassasa nomi kiritish majburiy"),
  position: z.string().trim().min(1, "Lavozim kiritish majburiy"),
  academicDegree: z.string().trim().min(1, "Ilmiy daraja kiritish majburiy"),
  participationMode: z.enum(["offline", "online"]),
})

type RegistrationFormData = z.infer<typeof formSchema>

const preferredCountries = ["uz", "kz", "kg", "tj", "tm", "ru"]

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const navigate = useNavigate()

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "+998",
      institution: "",
      position: "",
      academicDegree: "",
      participationMode: "offline",
    },
  })

  async function onSubmit(data: RegistrationFormData) {
    setIsSubmitting(true)
    try {
      const body = new URLSearchParams()
      body.append("firstName", data.firstName)
      body.append("lastName", data.lastName)
      body.append("email", data.email)
      body.append("phone", data.phone)
      body.append("institution", data.institution)
      body.append("position", data.position)
      body.append("academicDegree", data.academicDegree)
      body.append("participationMode", data.participationMode)

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      })

      setSubmittedEmail(data.email)
      setIsSuccessModalOpen(true)
      form.reset()
    } catch (error) {
      console.error(error)

      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.", {
        duration: 4000,
        position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls =
    "h-11 rounded-lg border border-white/20 bg-white/8 text-white placeholder:text-white/35 focus-visible:border-sky-500/60 focus-visible:ring-1 focus-visible:ring-sky-500/30"

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b17] px-6 pt-28 pb-24 text-white">
      {/* Gradient base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_50%,#070b17_100%)]" />
      {/* Blue grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
      {/* Glow orbs — ataylab zaif */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-blue-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/4 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-56 w-56 rounded-full bg-indigo-600/4 blur-[90px]" />
      {/* Neural animation */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <NeuralGrid />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-heading text-xs font-bold tracking-[0.28em] text-sky-400 uppercase">
            Ro'yxatdan o'tish
          </p>
          <h1 className="font-heading mb-4 text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-white">
            Malaka oshirish dasturiga qo'shiling
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/55">
            Quyidagi formani to'ldiring va ariza yuborang. Ko'rib chiqgandan
            so'ng siz bilan bog'lanamiz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_80px_rgba(36,107,254,0.08)] backdrop-blur-2xl md:p-10"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Shaxsiy ma'lumotlar */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-5 w-1 rounded-full bg-sky-400" />
                  <h3 className="font-heading text-base font-bold tracking-wide text-white">
                    Shaxsiy ma'lumotlar
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">Ism *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Hojiakbar"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Familiya *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adulhakimov"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="professor@university.uz"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Telefon raqam *
                        </FormLabel>
                        <FormControl>
                          <Controller
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                              <PhoneInput
                                defaultCountry="uz"
                                value={field.value}
                                onChange={field.onChange}
                                preferredCountries={preferredCountries}
                                inputStyle={{
                                  width: "100%",
                                  height: "44px",
                                  backgroundColor: "rgba(255,255,255,0.08)",
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  borderLeft: "none",
                                  borderRadius: "0 0.5rem 0.5rem 0",
                                  color: "white",
                                  fontSize: "14px",
                                  paddingLeft: "12px",
                                }}
                                countrySelectorStyleProps={{
                                  buttonStyle: {
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRight: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: "0.5rem 0 0 0.5rem",
                                    height: "44px",
                                    padding: "0 10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  },
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Kasbiy ma'lumotlar */}
              <div className="border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-5 w-1 rounded-full bg-sky-400" />
                  <h3 className="font-heading text-base font-bold tracking-wide text-white">
                    Kasbiy ma'lumotlar
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Muassasa yoki ish joyi *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="O'zMU, TDTU, TATU, ilmiy muassasa..."
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Lavozim *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Professor, dotsent, katta o'qituvchi..."
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="academicDegree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Ilmiy daraja / ixtisoslik *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PhD, DSc, fan nomzodi, dotsent..."
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Ishtirok tafsilotlari */}
              <div className="border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-5 w-1 rounded-full bg-sky-400" />
                  <h3 className="font-heading text-base font-bold tracking-wide text-white">
                    Ishtirok tafsilotlari
                  </h3>
                </div>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="participationMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/75">
                          Ishtirok etish shakli *
                        </FormLabel>
                        <FormControl>
                          <select
                            value={field.value}
                            onChange={field.onChange}
                            className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white transition outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                          >
                            <option value="offline" className="bg-slate-900">
                              Oflayn (Toshkent)
                            </option>
                            <option value="online" className="bg-slate-900">
                              Onlayn
                            </option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    "Ariza yuborish"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          navigate("/")
        }}
        email={submittedEmail}
      />
    </div>
  )
}
