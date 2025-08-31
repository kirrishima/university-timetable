export interface Theme {
  name: string;
  colors: {
    mainBg: string;
    mainText: string;
    cardBg: string;
    cardHeader: string;
    secondaryText: string;
    mutedText: string;
    primary: string;
    primaryText: string;
    primaryAccent: string;
    primaryAccentLight: string;
    primaryMuted: string;
    primaryMutedBg: string;
    primaryBorder: string;
    primaryLightestBg: string;
    ring: string;
    button: {
      hoverBg: string;
      disabledBg: string;
      disabledText: string;
    };
    classType: {
      lecture: string;
      seminar: string;
      lab: string;
    };
    divider: string;
  };
}

export const themes: Record<string, Theme> = {
  indigo: {
    name: "Indigo",
    colors: {
      mainBg: "bg-slate-50",
      mainText: "text-slate-800",
      cardBg: "bg-white",
      cardHeader: "text-slate-900",
      secondaryText: "text-slate-600",
      mutedText: "text-slate-500",
      primary: "bg-indigo-600",
      primaryText: "text-white",
      primaryAccent: "bg-indigo-500",
      primaryAccentLight: "bg-indigo-400",
      primaryMuted: "text-indigo-700",
      primaryMutedBg: "bg-indigo-100",
      primaryBorder: "border-indigo-200",
      primaryLightestBg: "bg-indigo-50",
      ring: "lg:focus:ring-indigo-500",
      button: {
        hoverBg: "hover:bg-slate-200",
        disabledBg: "bg-slate-300",
        disabledText: "text-slate-400",
      },
      classType: {
        lecture: "bg-blue-100 text-blue-800",
        seminar: "bg-green-100 text-green-800",
        lab: "bg-yellow-100 text-yellow-800",
      },
      divider: "border-slate-200",
    },
  },
  rose: {
    name: "Rose",
    colors: {
      mainBg: "bg-stone-50",
      mainText: "text-stone-800",
      cardBg: "bg-white",
      cardHeader: "text-stone-900",
      secondaryText: "text-stone-600",
      mutedText: "text-stone-500",
      primary: "bg-rose-600",
      primaryText: "text-white",
      primaryAccent: "bg-rose-500",
      primaryAccentLight: "bg-rose-400",
      primaryMuted: "text-rose-700",
      primaryMutedBg: "bg-rose-100",
      primaryBorder: "border-rose-200",
      primaryLightestBg: "bg-rose-50",
      ring: "lg:focus:ring-rose-500",
      button: {
        hoverBg: "hover:bg-stone-200",
        disabledBg: "bg-stone-300",
        disabledText: "text-stone-400",
      },
      classType: {
        lecture: "bg-rose-100 text-rose-800",
        seminar: "bg-amber-100 text-amber-800",
        lab: "bg-fuchsia-100 text-fuchsia-800",
      },
      divider: "border-stone-200",
    },
  },
  teal: {
    name: "Teal",
    colors: {
      mainBg: "bg-slate-50",
      mainText: "text-slate-800",
      cardBg: "bg-white",
      cardHeader: "text-slate-900",
      secondaryText: "text-slate-600",
      mutedText: "text-slate-500",
      primary: "bg-teal-600",
      primaryText: "text-white",
      primaryAccent: "bg-teal-500",
      primaryAccentLight: "bg-teal-400",
      primaryMuted: "text-teal-700",
      primaryMutedBg: "bg-teal-100",
      primaryBorder: "border-teal-200",
      primaryLightestBg: "bg-teal-50",
      ring: "lg:focus:ring-teal-500",
      button: {
        hoverBg: "hover:bg-slate-200",
        disabledBg: "bg-slate-300",
        disabledText: "text-slate-400",
      },
      classType: {
        lecture: "bg-cyan-100 text-cyan-800",
        seminar: "bg-emerald-100 text-emerald-800",
        lab: "bg-lime-100 text-lime-800",
      },
      divider: "border-slate-200",
    },
  },
  amber: {
    name: "Amber",
    colors: {
      mainBg: "bg-stone-100",
      mainText: "text-stone-800",
      cardBg: "bg-white",
      cardHeader: "text-stone-900",
      secondaryText: "text-stone-600",
      mutedText: "text-stone-500",
      primary: "bg-amber-500",
      primaryText: "text-stone-900",
      primaryAccent: "bg-amber-400",
      primaryAccentLight: "bg-amber-300",
      primaryMuted: "text-amber-700",
      primaryMutedBg: "bg-amber-100",
      primaryBorder: "border-amber-300",
      primaryLightestBg: "bg-amber-50",
      ring: "lg:focus:ring-amber-500",
      button: {
        hoverBg: "hover:bg-stone-200",
        disabledBg: "bg-stone-300",
        disabledText: "text-stone-500",
      },
      classType: {
        lecture: "bg-orange-100 text-orange-800",
        seminar: "bg-lime-100 text-lime-800",
        lab: "bg-yellow-100 text-yellow-800",
      },
      divider: "border-stone-200",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      mainBg: "bg-slate-900",
      mainText: "text-slate-300",
      cardBg: "bg-slate-800",
      cardHeader: "text-slate-100",
      secondaryText: "text-slate-400",
      mutedText: "text-slate-500",
      primary: "bg-sky-500",
      primaryText: "text-white",
      primaryAccent: "bg-sky-600",
      primaryAccentLight: "bg-sky-400",
      primaryMuted: "text-sky-400",
      primaryMutedBg: "bg-sky-900/50",
      primaryBorder: "border-sky-700",
      primaryLightestBg: "bg-sky-900/30",
      ring: "lg:focus:ring-sky-500",
      button: {
        hoverBg: "hover:bg-slate-700",
        disabledBg: "bg-slate-600",
        disabledText: "text-slate-400",
      },
      classType: {
        lecture: "bg-indigo-900 text-indigo-300",
        seminar: "bg-emerald-900 text-emerald-300",
        lab: "bg-amber-900 text-amber-300",
      },
      divider: "border-slate-700",
    },
  },
};