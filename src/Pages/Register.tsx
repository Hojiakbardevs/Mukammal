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

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfuEtBehYe9SkiW8sk-hVud8Sw0ya-T-PvSfx8RCLmgoua6eWUQ_3jectdX9uqn-zjPA/exec"

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
    "h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-primary/50"

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f1e] px-6 pt-28 pb-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black opacity-70" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-bold tracking-[0.28em] text-primary uppercase">
            Ro'yxatdan o'tish
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Malaka oshirish dasturiga qo'shiling
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/55">
            Quyidagi formani to'ldiring va ariza yuborang. Ko'rib chiqgandan
            so'ng siz bilan bog'lanamiz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-2xl md:p-10"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Shaxsiy ma'lumotlar */}
              <div>
                <h3 className="mb-5 text-lg font-bold text-white">
                  Shaxsiy ma'lumotlar
                </h3>
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
                            placeholder="Abdulhakimov"
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
                            placeholder="hojiakbar@example.com"
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
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "0 0.5rem 0.5rem 0",
                                  color: "white",
                                  fontSize: "14px",
                                }}
                                countrySelectorStyleProps={{
                                  buttonStyle: {
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "0.5rem 0 0 0.5rem",
                                    height: "44px",
                                    color: "white",
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
                <h3 className="mb-5 text-lg font-bold text-white">
                  Kasbiy ma'lumotlar
                </h3>
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
                            placeholder="Institut / Universitet / Kompaniya"
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
                            placeholder="Tadqiqotchi, O'qituvchi, Talaba..."
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
                            placeholder="PhD, DSc, Magistratura, AI mutaxassisi..."
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
                <h3 className="mb-5 text-lg font-bold text-white">
                  Ishtirok tafsilotlari
                </h3>
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
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 text-base font-bold tracking-widest text-white uppercase transition-all hover:to-primary"
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
