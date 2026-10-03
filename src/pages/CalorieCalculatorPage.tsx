import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { PainterlyArrowRight, PainterlyCheckIcon, PainterlyRefreshIcon } from '../components/ArtisticIcons';

interface CalorieCalculatorPageProps {
  onNavigate: (path: string) => void;
}

type Sex = 'male' | 'female';
type HeightUnit = 'cm' | 'ft-in';
type WeightUnit = 'kg' | 'lb';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';

interface ActivityOption {
  key: ActivityLevel;
  label: string;
  multiplier: number;
  description: string;
}

const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    key: 'sedentary',
    label: 'Sedentary',
    multiplier: 1.2,
    description: 'Little or no intentional exercise (desk job, mostly sitting)',
  },
  {
    key: 'light',
    label: 'Lightly Active',
    multiplier: 1.375,
    description: 'Light exercise or active movement 1–3 days/week',
  },
  {
    key: 'moderate',
    label: 'Moderately Active',
    multiplier: 1.55,
    description: 'Moderate exercise or sports 3–5 days/week',
  },
  {
    key: 'very',
    label: 'Very Active',
    multiplier: 1.725,
    description: 'Hard exercise or sports 6–7 days/week',
  },
  {
    key: 'extra',
    label: 'Extra Active',
    multiplier: 1.9,
    description: 'Very hard physical training or demanding physical job',
  },
];

interface CalculationResult {
  bmr: number;
  maintenance: number;
  lossMin: number;
  lossMax: number;
  isNearFloor: boolean;
}

export const CalorieCalculatorPage: React.FC<CalorieCalculatorPageProps> = ({ onNavigate }) => {
  // Input states
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState<string>('30');
  
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [weightKg, setWeightKg] = useState<string>('75');
  const [weightLb, setWeightLb] = useState<string>('165');

  const [activity, setActivity] = useState<ActivityLevel>('moderate');

  // Result and validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Unit conversion handlers
  const handleHeightUnitToggle = (newUnit: HeightUnit) => {
    if (newUnit === heightUnit) return;
    if (newUnit === 'ft-in') {
      const cmVal = parseFloat(heightCm);
      if (!isNaN(cmVal) && cmVal > 0) {
        const totalInches = cmVal / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        setHeightFt(String(ft));
        setHeightIn(String(inches === 12 ? 0 : inches));
      }
    } else {
      const ftVal = parseFloat(heightFt) || 0;
      const inVal = parseFloat(heightIn) || 0;
      const totalInches = ftVal * 12 + inVal;
      if (totalInches > 0) {
        const cm = Math.round(totalInches * 2.54);
        setHeightCm(String(cm));
      }
    }
    setHeightUnit(newUnit);
  };

  const handleWeightUnitToggle = (newUnit: WeightUnit) => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lb') {
      const kgVal = parseFloat(weightKg);
      if (!isNaN(kgVal) && kgVal > 0) {
        const lb = Math.round(kgVal * 2.20462);
        setWeightLb(String(lb));
      }
    } else {
      const lbVal = parseFloat(weightLb);
      if (!isNaN(lbVal) && lbVal > 0) {
        const kg = Math.round(lbVal / 2.20462);
        setWeightKg(String(kg));
      }
    }
    setWeightUnit(newUnit);
  };

  const validateAndCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate Age (15 - 100)
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 15 || ageNum > 100) {
      newErrors.age = 'Please enter an age between 15 and 100.';
    }

    // Validate Height
    let finalCm = 0;
    if (heightUnit === 'cm') {
      const cmNum = parseFloat(heightCm);
      if (isNaN(cmNum) || cmNum < 100 || cmNum > 250) {
        newErrors.height = 'Please enter a height between 100 and 250 cm.';
      } else {
        finalCm = cmNum;
      }
    } else {
      const ftNum = parseInt(heightFt, 10);
      const inNum = parseInt(heightIn, 10);
      if (isNaN(ftNum) || ftNum < 3 || ftNum > 8 || isNaN(inNum) || inNum < 0 || inNum > 11) {
        newErrors.height = 'Please enter a realistic height (e.g. 5 ft 9 in).';
      } else {
        finalCm = (ftNum * 12 + inNum) * 2.54;
      }
    }

    // Validate Weight
    let finalKg = 0;
    if (weightUnit === 'kg') {
      const kgNum = parseFloat(weightKg);
      if (isNaN(kgNum) || kgNum < 30 || kgNum > 300) {
        newErrors.weight = 'Please enter a weight between 30 and 300 kg.';
      } else {
        finalKg = kgNum;
      }
    } else {
      const lbNum = parseFloat(weightLb);
      if (isNaN(lbNum) || lbNum < 66 || lbNum > 660) {
        newErrors.weight = 'Please enter a weight between 66 and 660 lb.';
      } else {
        finalKg = lbNum / 2.20462;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setResult(null);
      return;
    }

    // Standard Mifflin-St Jeor BMR calculation
    // Male: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
    // Female: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
    let rawBmr = 10 * finalKg + 6.25 * finalCm - 5 * ageNum;
    if (sex === 'male') {
      rawBmr += 5;
    } else {
      rawBmr -= 161;
    }

    const selectedActivity = ACTIVITY_OPTIONS.find((a) => a.key === activity) || ACTIVITY_OPTIONS[0];
    const maintenanceCalories = Math.round(rawBmr * selectedActivity.multiplier);
    const bmrRounded = Math.round(rawBmr);

    // Conservative weight loss deficit range (300 to 500 kcal deficit)
    const floorLimit = sex === 'female' ? 1200 : 1500;
    const lossMin = Math.max(floorLimit, maintenanceCalories - 500);
    const lossMax = Math.max(lossMin, maintenanceCalories - 300);
    const isNearFloor = maintenanceCalories - 500 < floorLimit;

    setResult({
      bmr: bmrRounded,
      maintenance: maintenanceCalories,
      lossMin,
      lossMax,
      isNearFloor,
    });

    // Smoothly scroll to results
    setTimeout(() => {
      const el = document.getElementById('calculator-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setErrors({});
    const formEl = document.getElementById('calorie-calculator-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HealthManipulator Calorie Calculator',
    url: `${SITE_CONFIG.siteUrl}/calorie-calculator`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    description:
      'Estimate your daily calorie needs and maintenance calories based on age, height, weight, sex, and activity level.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_CONFIG.siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calorie Calculator',
        item: `${SITE_CONFIG.siteUrl}/calorie-calculator`,
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Calorie Calculator – Estimate Your Daily Calorie Needs"
        description="Estimate your daily calorie needs and maintenance calories using your age, height, weight, sex, and activity level. Simple, free calorie calculator."
        path="/calorie-calculator"
        exactTitle={false}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* HIERARCHICAL BREADCRUMB NAVIGATION */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4E5B73] sm:text-sm">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="transition-colors hover:text-[#F06449]"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-[#99A1AF]">/</span>
          <span className="font-bold text-[#172033]" aria-current="page">
            Calorie Calculator
          </span>
        </nav>

        {/* PAGE HEADER */}
        <header className="overflow-hidden rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] shadow-[6px_6px_0_#172033]">
          <div aria-hidden="true" className="grid h-2.5 grid-cols-12 border-b-[2.5px] border-[#172033]">
            <div className="col-span-6 bg-[#F06449]" />
            <div className="col-span-4 border-l-[2px] border-[#172033] bg-[#9ED8C5]" />
            <div className="col-span-2 border-l-[2px] border-[#172033] bg-[#B9A7E8]" />
          </div>

          <div className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 border-[2px] border-[#172033] bg-[#F06449]"
                />
                <span className="text-xs font-bold tracking-wider text-[#172033] uppercase">
                  Simple Practical Tool
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight text-[#172033] sm:text-4xl">
                Calorie Calculator
              </h1>
              <p className="text-base leading-relaxed text-[#2A354B] sm:text-lg">
                A simple calorie calculator to estimate your daily calorie needs and maintenance baseline.
              </p>
            </div>

            <div className="hidden shrink-0 sm:block">
              <img
                src={SITE_CONFIG.branding.mascotGesture}
                alt=""
                aria-hidden="true"
                className="h-28 w-auto object-contain md:h-32"
              />
            </div>
          </div>
        </header>

        {/* MAIN CALCULATOR CARD */}
        <div className="overflow-hidden rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] shadow-[6px_6px_0_#172033]">
          <div className="border-b-[2.5px] border-[#172033] bg-[#F7F3EA] px-6 py-4">
            <h2 className="font-display text-xl font-bold text-[#172033] sm:text-2xl">
              Enter Your Details
            </h2>
            <p className="text-xs text-[#4E5B73] sm:text-sm">
              All calculations run privately in your browser. No data is stored or sent anywhere.
            </p>
          </div>

          <form id="calorie-calculator-form" onSubmit={validateAndCalculate} className="space-y-8 p-6 sm:p-10">
            {/* 1. SEX SELECTION */}
            <div className="space-y-2.5">
              <label className="block text-sm font-bold text-[#172033]">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-4 sm:max-w-md">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`flex items-center justify-center gap-2 rounded-[6px] border-[2.5px] border-[#172033] py-3 text-sm font-bold transition-all ${
                    sex === 'male'
                      ? 'bg-[#9ED8C5] shadow-[3px_3px_0_#172033]'
                      : 'bg-[#FFFDF8] hover:bg-[#F7F3EA]'
                  }`}
                >
                  {sex === 'male' && <PainterlyCheckIcon className="h-4 w-4" />}
                  <span>Male</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`flex items-center justify-center gap-2 rounded-[6px] border-[2.5px] border-[#172033] py-3 text-sm font-bold transition-all ${
                    sex === 'female'
                      ? 'bg-[#B9A7E8] shadow-[3px_3px_0_#172033]'
                      : 'bg-[#FFFDF8] hover:bg-[#F7F3EA]'
                  }`}
                >
                  {sex === 'female' && <PainterlyCheckIcon className="h-4 w-4" />}
                  <span>Female</span>
                </button>
              </div>
            </div>

            {/* 2. AGE INPUT */}
            <div className="space-y-2">
              <label htmlFor="input-age" className="block text-sm font-bold text-[#172033]">
                Age (years)
              </label>
              <input
                id="input-age"
                type="number"
                inputMode="numeric"
                min="15"
                max="100"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
                }}
                className={`w-full max-w-xs rounded-[6px] border-[2.5px] bg-[#FFFDF8] px-3.5 py-2.5 text-base font-semibold text-[#172033] shadow-[2px_2px_0_#172033] focus:outline-none focus:ring-2 focus:ring-[#F06449] ${
                  errors.age ? 'border-[#E04838] bg-[#FDF0EE]' : 'border-[#172033]'
                }`}
                placeholder="30"
              />
              {errors.age && (
                <p className="text-xs font-bold text-[#C53020]">{errors.age}</p>
              )}
            </div>

            {/* 3. HEIGHT INPUT & UNIT SELECTOR */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between sm:max-w-md">
                <label className="block text-sm font-bold text-[#172033]">
                  Height
                </label>
                <div className="inline-flex rounded-[5px] border-[2px] border-[#172033] bg-[#FFFDF8] p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleHeightUnitToggle('cm')}
                    className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                      heightUnit === 'cm' ? 'bg-[#172033] text-white' : 'text-[#172033] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHeightUnitToggle('ft-in')}
                    className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                      heightUnit === 'ft-in' ? 'bg-[#172033] text-white' : 'text-[#172033] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    ft / in
                  </button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    id="input-height-cm"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={heightCm}
                    onChange={(e) => {
                      setHeightCm(e.target.value);
                      if (errors.height) setErrors((prev) => ({ ...prev, height: '' }));
                    }}
                    className={`w-full rounded-[6px] border-[2.5px] bg-[#FFFDF8] px-3.5 py-2.5 text-base font-semibold text-[#172033] shadow-[2px_2px_0_#172033] focus:outline-none focus:ring-2 focus:ring-[#F06449] ${
                      errors.height ? 'border-[#E04838] bg-[#FDF0EE]' : 'border-[#172033]'
                    }`}
                    placeholder="175"
                  />
                  <span className="text-sm font-bold text-[#4E5B73]">cm</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 max-w-xs">
                  <div className="flex flex-1 items-center gap-1.5">
                    <input
                      id="input-height-ft"
                      type="number"
                      inputMode="numeric"
                      min="3"
                      max="8"
                      value={heightFt}
                      onChange={(e) => {
                        setHeightFt(e.target.value);
                        if (errors.height) setErrors((prev) => ({ ...prev, height: '' }));
                      }}
                      className="w-full rounded-[6px] border-[2.5px] border-[#172033] bg-[#FFFDF8] px-3 py-2.5 text-base font-semibold text-[#172033] shadow-[2px_2px_0_#172033] focus:outline-none focus:ring-2 focus:ring-[#F06449]"
                      placeholder="5"
                    />
                    <span className="text-xs font-bold text-[#4E5B73]">ft</span>
                  </div>
                  <div className="flex flex-1 items-center gap-1.5">
                    <input
                      id="input-height-in"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => {
                        setHeightIn(e.target.value);
                        if (errors.height) setErrors((prev) => ({ ...prev, height: '' }));
                      }}
                      className="w-full rounded-[6px] border-[2.5px] border-[#172033] bg-[#FFFDF8] px-3 py-2.5 text-base font-semibold text-[#172033] shadow-[2px_2px_0_#172033] focus:outline-none focus:ring-2 focus:ring-[#F06449]"
                      placeholder="9"
                    />
                    <span className="text-xs font-bold text-[#4E5B73]">in</span>
                  </div>
                </div>
              )}
              {errors.height && (
                <p className="text-xs font-bold text-[#C53020]">{errors.height}</p>
              )}
            </div>

            {/* 4. WEIGHT INPUT & UNIT SELECTOR */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between sm:max-w-md">
                <label className="block text-sm font-bold text-[#172033]">
                  Current Weight
                </label>
                <div className="inline-flex rounded-[5px] border-[2px] border-[#172033] bg-[#FFFDF8] p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleWeightUnitToggle('kg')}
                    className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                      weightUnit === 'kg' ? 'bg-[#172033] text-white' : 'text-[#172033] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWeightUnitToggle('lb')}
                    className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                      weightUnit === 'lb' ? 'bg-[#172033] text-white' : 'text-[#172033] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    lb
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 max-w-xs">
                <input
                  id="input-weight"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={weightUnit === 'kg' ? weightKg : weightLb}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (weightUnit === 'kg') {
                      setWeightKg(val);
                    } else {
                      setWeightLb(val);
                    }
                    if (errors.weight) setErrors((prev) => ({ ...prev, weight: '' }));
                  }}
                  className={`w-full rounded-[6px] border-[2.5px] bg-[#FFFDF8] px-3.5 py-2.5 text-base font-semibold text-[#172033] shadow-[2px_2px_0_#172033] focus:outline-none focus:ring-2 focus:ring-[#F06449] ${
                    errors.weight ? 'border-[#E04838] bg-[#FDF0EE]' : 'border-[#172033]'
                  }`}
                  placeholder={weightUnit === 'kg' ? '75' : '165'}
                />
                <span className="text-sm font-bold text-[#4E5B73]">{weightUnit}</span>
              </div>
              {errors.weight && (
                <p className="text-xs font-bold text-[#C53020]">{errors.weight}</p>
              )}
            </div>

            {/* 5. ACTIVITY LEVEL SELECTOR */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#172033]">
                Daily Activity Level
              </label>
              <div className="space-y-2.5">
                {ACTIVITY_OPTIONS.map((option) => {
                  const isSelected = activity === option.key;
                  return (
                    <label
                      key={option.key}
                      onClick={() => setActivity(option.key)}
                      className={`flex cursor-pointer items-start gap-3 rounded-[6px] border-[2px] p-3.5 transition-all ${
                        isSelected
                          ? 'border-[#172033] bg-[#EFE5D4] shadow-[3px_3px_0_#172033]'
                          : 'border-[#172033] bg-[#FFFDF8] hover:bg-[#F7F3EA]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="activityLevel"
                        value={option.key}
                        checked={isSelected}
                        onChange={() => setActivity(option.key)}
                        className="mt-1 h-4 w-4 border-2 border-[#172033] text-[#F06449] focus:ring-[#F06449]"
                      />
                      <div className="space-y-0.5">
                        <span className="block text-sm font-bold text-[#172033]">
                          {option.label}
                        </span>
                        <span className="block text-xs leading-relaxed text-[#4E5B73] sm:text-[13px]">
                          {option.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-painterly flex w-full items-center justify-center gap-2 rounded-[6px] py-3.5 text-base font-bold sm:w-auto sm:px-8"
              >
                <span>Calculate Daily Needs</span>
                <PainterlyArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <section
            id="calculator-results"
            aria-labelledby="results-heading"
            className="space-y-6 rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] p-6 shadow-[6px_6px_0_#172033] sm:p-10"
          >
            <div className="flex flex-col gap-3 border-b-[2.5px] border-[#172033] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#F06449] uppercase">
                  Calculation Results
                </span>
                <h2 id="results-heading" className="font-display text-2xl font-bold text-[#172033] sm:text-3xl">
                  Your Estimated Daily Needs
                </h2>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="btn-painterly-secondary inline-flex items-center gap-1.5 self-start rounded-[6px] px-3.5 py-1.5 text-xs font-bold"
              >
                <PainterlyRefreshIcon className="h-3.5 w-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            {/* 3 SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {/* BMR */}
              <div className="rounded-[6px] border-[2.5px] border-[#172033] bg-[#F7F3EA] p-5 shadow-[3px_3px_0_#172033]">
                <span className="block text-xs font-bold text-[#4E5B73] uppercase">
                  Basal Metabolic Rate
                </span>
                <p className="my-1.5 font-display text-2xl font-bold text-[#172033] sm:text-3xl">
                  {result.bmr.toLocaleString()} <span className="text-sm font-sans font-semibold text-[#4E5B73]">kcal/day</span>
                </p>
                <p className="text-xs leading-relaxed text-[#4E5B73]">
                  Estimated energy your body uses at complete rest to keep vital organs functioning.
                </p>
              </div>

              {/* MAINTENANCE */}
              <div className="rounded-[6px] border-[2.5px] border-[#172033] bg-[#9ED8C5] p-5 shadow-[3px_3px_0_#172033]">
                <span className="block text-xs font-bold text-[#172033] uppercase">
                  Maintenance (TDEE)
                </span>
                <p className="my-1.5 font-display text-2xl font-bold text-[#172033] sm:text-3xl">
                  {result.maintenance.toLocaleString()} <span className="text-sm font-sans font-semibold text-[#172033]">kcal/day</span>
                </p>
                <p className="text-xs leading-relaxed text-[#172033]">
                  Estimated calories needed to maintain your current weight with your activity level.
                </p>
              </div>

              {/* WEIGHT LOSS RANGE */}
              <div className="rounded-[6px] border-[2.5px] border-[#172033] bg-[#B9A7E8] p-5 shadow-[3px_3px_0_#172033]">
                <span className="block text-xs font-bold text-[#172033] uppercase">
                  Weight-Loss Range
                </span>
                <p className="my-1.5 font-display text-2xl font-bold text-[#172033] sm:text-3xl">
                  {result.lossMin.toLocaleString()} – {result.lossMax.toLocaleString()}{' '}
                  <span className="text-sm font-sans font-semibold text-[#172033]">kcal/day</span>
                </p>
                <p className="text-xs leading-relaxed text-[#172033]">
                  A moderate, sustainable ~300 to 500 kcal deficit range below maintenance.
                </p>
              </div>
            </div>

            {/* SAFETY & CONTEXT NOTE */}
            <div className="space-y-3 rounded-[6px] border-[2px] border-[#172033] bg-[#FFFDF8] p-4 text-xs leading-relaxed text-[#2A354B] sm:text-sm">
              <p>
                <strong>How to use this estimate:</strong> Rather than trying to hit one exact, perfect number every single day, look at calories like a flexible weekly budget. Some days you might eat a little closer to maintenance, and other days lighter.
              </p>
              {result.isNearFloor && (
                <p className="font-semibold text-[#C53020]">
                  Safety note: For healthy energy levels, it is generally recommended not to drop below 1,200 kcal/day (for women) or 1,500 kcal/day (for men) without individualized medical guidance.
                </p>
              )}
              <p className="text-xs text-[#6B7892]">
                Formula note: Calculations are based on the standard Mifflin-St Jeor formula. These numbers are personal estimates and starting points, not medical or clinical prescriptions.
              </p>
            </div>

            {/* PRACTICAL NEXT STEPS & INTERNAL LINKS */}
            <div className="border-t-[2.5px] border-[#172033] pt-6">
              <h3 className="mb-3 font-display text-lg font-bold text-[#172033]">
                Practical Tips to Make This Easy:
              </h3>
              <ul className="space-y-2 text-sm text-[#172033]">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="font-bold text-[#F06449]">→</span>
                  <span>
                    Read how I stopped stressing over every bite in{' '}
                    <a
                      href="/blog/i-treat-my-calories-like-a-daily-budget"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onNavigate('/blog/i-treat-my-calories-like-a-daily-budget');
                        }
                      }}
                      className="font-bold underline decoration-[#F06449] decoration-2 underline-offset-2 hover:text-[#F06449]"
                    >
                      I Treat My Calories Like a Daily Budget
                    </a>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="font-bold text-[#F06449]">→</span>
                  <span>
                    Discover high-volume foods that keep hunger manageable in{' '}
                    <a
                      href="/blog/cheat-code-foods-for-hunger"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onNavigate('/blog/cheat-code-foods-for-hunger');
                        }
                      }}
                      className="font-bold underline decoration-[#F06449] decoration-2 underline-offset-2 hover:text-[#F06449]"
                    >
                      Cheat Code Foods for Hunger
                    </a>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="font-bold text-[#F06449]">→</span>
                  <span>
                    Learn how small daily swaps add up in{' '}
                    <a
                      href="/blog/brainless-weight-loss"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onNavigate('/blog/brainless-weight-loss');
                        }
                      }}
                      className="font-bold underline decoration-[#F06449] decoration-2 underline-offset-2 hover:text-[#F06449]"
                    >
                      The Brainless Way I Lost Weight
                    </a>.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
};
